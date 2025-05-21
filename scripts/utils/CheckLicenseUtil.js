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

/**
 * This file's code is ported to NodeJs (and is modified by Wingify) from:
 *
 * URL - https://github.com/facultyai/apache-license-check/blob/master/apache_license_check.py
 * Description - Check Python source files for Apache License headers
 * Author - Andrew Crozier https://github.com/acroz
 * License - Apache 2.0
 * Copyright 2019 Faculty Science Limited
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

const fs = require('fs');
const AnsiColorEnum = require('../enums/AnsiColorEnum');

const DEFAULT_STOPPING_CRITERIA = 'SOME_GARBAGE_TEXT_which_NEVER_MATCHES_THIS';
const SUCCESS_MESSAGE = 'LICENSE/COPYRIGHT header present in all files with correct format';
const FAILURE_MESSAGE = 'LICENSE/COPYRIGHT header is missing. Please check above errors.';
const NOT_PRESENT_MESSAGE = 'NOT PRESENT / WRONG FORMAT';
const MISSING_PARAMS_MESSAGE = 'Options: paths, author, year and extensions are mandatory';

const LICENSE_HEADER_TEMPLATE = `
Copyright {year} {author}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`;

/**
 * Recursively collects all files with the given extensions, excluding specified paths.
 * @param {Object} params
 * @param {string} params.dirPath - Directory path to start searching from.
 * @param {string[]} params.excludes - List of paths to exclude from search.
 * @param {string[]} params.extensions - List of file extensions to include.
 * @param {string[]} params.collectedFiles - Array to collect found file paths.
 */
function collectFiles({ dirPath, excludes, extensions, collectedFiles }) {
  if (excludes.includes(dirPath)) return;

  if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
    const entries = fs.readdirSync(dirPath);
    for (const entry of entries) {
      collectFiles({
        dirPath: `${dirPath}/${entry}`,
        excludes,
        extensions,
        collectedFiles,
      });
    }
  } else if (
    fs.existsSync(dirPath) &&
    fs.lstatSync(dirPath).isFile() &&
    extensions.some((ext) => dirPath.endsWith(ext))
  ) {
    collectedFiles.push(dirPath);
  }
}

/**
 * Reads the header lines from a file until the stopping criteria is met.
 * Trims each line and skips empty lines. If a shebang (#!) is present at the top,
 * the header check starts from the next line.
 *
 * @param {string} filePath - Path to the file to read.
 * @param {string} stoppingCriteria - Regex string to determine where to stop reading.
 * @returns {string[]} Array of trimmed header lines.
 */
function readHeaderLines(filePath, stoppingCriteria) {
  const headerLines = [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    let startIdx = 0;
    // Skip shebang if present
    if (lines[0] && lines[0].startsWith('#!')) {
      startIdx = 1;
    }
    const stopPattern = new RegExp(`(.*|\n)${stoppingCriteria}`, 'ig');
    for (let i = startIdx; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (!trimmed) continue;
      if (stopPattern.test(trimmed)) break;
      headerLines.push(trimmed);
    }
  } catch (err) {
    console.error(err);
  }
  return headerLines;
}

/**
 * Checks if the license header lines are present in the file header.
 * The check is order-sensitive and expects the header block to be contiguous.
 *
 * @param {string[]} fileHeaderLines - Lines from the file header.
 * @param {string[]} licenseHeaderLines - Expected license header lines.
 * @returns {boolean} True if license header is present, false otherwise.
 */
function hasLicenseHeader(fileHeaderLines, licenseHeaderLines) {
  for (let i = 0; i < licenseHeaderLines.length - 1; i++) {
    if (!fileHeaderLines[i + 1] || fileHeaderLines[i + 1].indexOf(licenseHeaderLines[i]) === -1) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if the copyright line is present in the file header.
 *
 * @param {string[]} fileHeaderLines - Lines from the file header.
 * @param {string} copyright - Copyright string to search for.
 * @returns {boolean} True if copyright line is present, false otherwise.
 */
function hasCopyrightLine(fileHeaderLines, copyright) {
  return fileHeaderLines.some(
    (line) => line.match(/^[\s#*]+Copyright(.*)/gi) && line.includes(copyright)
  );
}

/**
 * Main function to check license and copyright headers in files.
 *
 * This function will recursively search for files, read their headers, and check for the presence
 * of the required license and copyright information. It prints results to the console and returns
 * a boolean indicating whether all files passed the check.
 *
 * @param {Object} params
 * @param {string} params.author - Author name for the copyright.
 * @param {string} params.year - Year for the copyright.
 * @param {string} params.paths - Comma-separated list of paths to check.
 * @param {string[]} params.excludes - List of paths to exclude from search.
 * @param {string[]} params.extensions - List of file extensions to include.
 * @param {string} [params.stoppingCriteria] - Optional stopping criteria for header reading.
 * @returns {boolean} True if all files have correct headers, false otherwise.
 */
function checkLicenseAndCopyright({
  author,
  year,
  paths,
  excludes,
  extensions,
  stoppingCriteria = DEFAULT_STOPPING_CRITERIA,
}) {
  if (!paths || !year || !author || !extensions) {
    console.error(`${AnsiColorEnum.RED}${MISSING_PARAMS_MESSAGE}${AnsiColorEnum.RESET}`);
    process.exit(1);
  }

  // Prepare copyright and license header for matching
  const copyright = `Copyright ${year} ${author}`;
  const licenseHeader = LICENSE_HEADER_TEMPLATE.replace(/{year}/gi, year).replace(/{author}/gi, author);
  const licenseHeaderLines = licenseHeader.trim().split('\n');
  const pathList = paths.split(',');
  let allFilesHaveHeaders = true;

  // Iterate through all files in all specified paths
  for (const basePath of pathList) {
    const files = [];
    collectFiles({ dirPath: basePath, excludes, extensions, collectedFiles: files });
    for (const file of files) {
      const headerLines = readHeaderLines(file, stoppingCriteria);
      const hasCopyright = hasCopyrightLine(headerLines, copyright);
      const hasLicense = hasLicenseHeader(headerLines, licenseHeaderLines);
      let copyrightMsg = '';
      let licenseMsg = '';
      if (!hasCopyright) {
        copyrightMsg = ` Copyright:${AnsiColorEnum.RESET} ${AnsiColorEnum.YELLOW}${NOT_PRESENT_MESSAGE}${AnsiColorEnum.RESET}`;
      }
      if (!hasLicense) {
        licenseMsg = ` License:${AnsiColorEnum.RESET} ${AnsiColorEnum.YELLOW}${NOT_PRESENT_MESSAGE}${AnsiColorEnum.RESET}`;
      }
      allFilesHaveHeaders = allFilesHaveHeaders && hasCopyright && hasLicense;
      if (!hasLicense || !hasCopyright) {
        const output = `${AnsiColorEnum.BOLD}${AnsiColorEnum.CYAN}${file}${AnsiColorEnum.RESET}${copyrightMsg} ${licenseMsg}`;
        console.log(output);
      }
    }
  }

  // Print summary and return result
  if (allFilesHaveHeaders) {
    console.info(`${AnsiColorEnum.GREEN}\n\n${SUCCESS_MESSAGE}.${AnsiColorEnum.RESET}\n\n`);
    return true;
  } else {
    console.error(`${AnsiColorEnum.RED}\n\n${FAILURE_MESSAGE}${AnsiColorEnum.RESET}\n\n`);
    return false;
  }
}

// Export the main check function for use in other scripts
module.exports = {
  checkLicenseAndCopyright,
};
