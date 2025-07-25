/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const semver = require('semver');
const ShellUtil = require('./shell');
const packageConfig = require('../../package.json');

const AnsiColorEnum = {
  BOLD: '\x1b[1m',
  CYAN: '\x1b[36m',
  GREEN: '\x1b[32m',
  LIGHTBLUE: '\x1b[94m',
  RED: '\x1b[31m',
  RESET: '\x1b[0m',
  WHITE: '\x1b[30m',
  YELLOW: '\x1b[33m',
};

/**
 * Returns an array of version requirement objects for the specified modules.
 * @param {string[]} mods - List of modules to check (e.g., ['node', 'yarn', 'nodeLint'])
 * @returns {Array<{name: string, currentVersion: string, versionRequirement: string}>}
 */
function getVersionRequirements(mods) {
  const requirements = [];
  if (!mods || !mods.length) return requirements;

  if (mods.includes('node') && ShellUtil.shell.which('node')) {
    requirements.push({
      name: 'node',
      currentVersion: semver.clean(process.version),
      versionRequirement: packageConfig.engines.node,
    });
  }
  if (mods.includes('nodeLint') && ShellUtil.shell.which('node')) {
    requirements.push({
      name: 'node',
      currentVersion: semver.clean(process.version),
      versionRequirement: packageConfig.customEngines.nodeLint,
    });
  }
  if (mods.includes('yarn') && ShellUtil.shell.which('yarn')) {
    requirements.push({
      name: 'yarn',
      currentVersion: ShellUtil.exec('yarn --version'),
      versionRequirement: packageConfig.engines.yarn,
    });
  }
  return requirements;
}

/**
 * Returns an array of warning strings for modules that do not satisfy version requirements.
 * @param {string[]} mods - List of modules to check.
 * @returns {string[]} Array of warning messages.
 */
function getWarnings(mods) {
  const requirements = getVersionRequirements(mods);
  const warnings = [];
  for (const mod of requirements) {
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        `${mod.name}: ${AnsiColorEnum.RED}${mod.currentVersion}${AnsiColorEnum.RESET} should be ${AnsiColorEnum.GREEN}${mod.versionRequirement}${AnsiColorEnum.RESET}`
      );
    }
  }
  return warnings;
}

/**
 * Verifies the specified modules and prints warnings if requirements are not met.
 * @param {string[]} mods - List of modules to check.
 * @returns {string[]} Array of warning messages.
 */
function verify(mods) {
  if (!mods || !mods.length) return [];
  const warnings = getWarnings(mods);
  if (warnings.length) {
    console.log('');
    console.log(
      `${AnsiColorEnum.YELLOW}To contribute in VWO SDK development, you must update the following to:${AnsiColorEnum.RESET}`
    );
    console.log();
    for (const warning of warnings) {
      console.log('  ' + warning);
    }
    console.log();
  }
  return warnings;
}

module.exports = {
  verify,
  getWarnings,
};
