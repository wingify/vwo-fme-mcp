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

const GITHUB_RAW_RULE_BASE_URL =
  'https://raw.githubusercontent.com/wingify/vwo-fme-mcp/master/cursor-rules/';

const sdkFileMap: Record<string, string> = {
  node: 'vwo-mcp-rules-node.mdc',
  javascript: 'vwo-mcp-rules-node.mdc',
  typescript: 'vwo-mcp-rules-node.mdc',
  java: 'vwo-mcp-rules-java.mdc',
  python: 'vwo-mcp-rules-python.mdc',
  react: 'vwo-mcp-rules-react.mdc',
  php: 'vwo-mcp-rules-php.mdc',
  ruby: 'vwo-mcp-rules-ruby.mdc',
};

export async function writeCursorRuleToUserDir(targetDir: string, sdk: string): Promise<void> {
  const rulesDir: string = path.join(targetDir, '.cursor', 'rules');

  if (!fs.existsSync(rulesDir)) {
    fs.mkdirSync(rulesDir, { recursive: true });
  }

  const ruleFileName = sdkFileMap[sdk];
  const githubRuleUrl = `${GITHUB_RAW_RULE_BASE_URL}${ruleFileName}?t=${Date.now()}`;

  const ruleFilePath: string = path.join(rulesDir, 'vwo-feature-flag-rule.mdc');
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
}
