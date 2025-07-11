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

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { fetchFilteredSdkReadme, sdkDocumentationLink } from './GetDocumentationData';

/**
 * Base URL for the cursor rule files
 */
const GITHUB_RAW_RULE_BASE_URL =
  'https://raw.githubusercontent.com/wingify/vwo-fme-mcp/master/ide-rules/';

/**
 * Writes the cursor rule to the user's directory
 * @param targetDir - The target directory to write the cursor rule
 * @param sdk - The SDK to write the cursor rule for
 */
export async function writeCursorRuleToUserDir(
  targetDir: string,
  sdk: string,
  whichIde: string,
): Promise<void> {
  let rulesDir: string;
  let ruleFilePath: string;

  if (whichIde === 'vscode') {
    rulesDir = path.join(targetDir, '.github', 'instructions');
    ruleFilePath = path.join(rulesDir, 'vwo-fme.instructions.md');
  } else if (whichIde === 'cursor') {
    rulesDir = path.join(targetDir, '.cursor', 'rules');
    ruleFilePath = path.join(rulesDir, 'vwo-feature-flag-rule.mdc');
  } else {
    throw new Error('Invalid IDE');
  }

  if (!fs.existsSync(rulesDir)) {
    fs.mkdirSync(rulesDir, { recursive: true });
  }

  const githubRuleUrl = `${GITHUB_RAW_RULE_BASE_URL}vwo-fme-mcp-rules.mdc?t=${Date.now()}`;

  // First, download the base cursor rule file
  await new Promise<void>((resolve, reject) => {
    https
      .get(githubRuleUrl, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch rule file: ${res.statusCode}`));
          return;
        }
        const fileStream = fs.createWriteStream(ruleFilePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
        fileStream.on('error', (err) => {
          reject(err);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  // Then, fetch the filtered SDK README and append it to the file
  try {
    const relevantContent = await fetchFilteredSdkReadme(sdk);

    if (relevantContent) {
      const separator = `\n\n---\n\n## Refer to the SDK Documentation for more details\n\n${sdkDocumentationLink}${sdk}\n\n`;
      const contentToAppend = relevantContent + separator;

      fs.appendFileSync(ruleFilePath, contentToAppend);
    }
  } catch (error) {
    console.warn(`Failed to fetch SDK README for ${sdk}:`, error);
    // Continue without the SDK documentation if it fails
  }
}
