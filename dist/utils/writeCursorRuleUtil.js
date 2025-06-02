"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCursorRuleToUserDir = writeCursorRuleToUserDir;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const https = __importStar(require("https"));
const GITHUB_RAW_RULE_BASE_URL = 'https://raw.githubusercontent.com/wingify/vwo-fme-mcp/master/cursor-rules/';
const sdkFileMap = {
    node: 'vwo-mcp-rules-node.mdc',
    javascript: 'vwo-mcp-rules-node.mdc',
    typescript: 'vwo-mcp-rules-node.mdc',
    java: 'vwo-mcp-rules-java.mdc',
    python: 'vwo-mcp-rules-python.mdc',
    react: 'vwo-mcp-rules-react.mdc',
    php: 'vwo-mcp-rules-php.mdc',
    ruby: 'vwo-mcp-rules-ruby.mdc',
};
async function writeCursorRuleToUserDir(targetDir, sdk) {
    const rulesDir = path.join(targetDir, '.cursor', 'rules');
    if (!fs.existsSync(rulesDir)) {
        fs.mkdirSync(rulesDir, { recursive: true });
    }
    const ruleFileName = sdkFileMap[sdk];
    const githubRuleUrl = `${GITHUB_RAW_RULE_BASE_URL}${ruleFileName}?t=${Date.now()}`;
    const ruleFilePath = path.join(rulesDir, 'vwo-feature-flag-rule.mdc');
    await new Promise((resolve, reject) => {
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
//# sourceMappingURL=writeCursorRuleUtil.js.map