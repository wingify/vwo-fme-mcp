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
exports.scanCodebaseForFeatureFlags = scanCodebaseForFeatureFlags;
exports.enrichRecommendationsWithReferences = enrichRecommendationsWithReferences;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const glob_1 = require("glob");
// Map file extensions to their corresponding regex patterns
const extensionToRegexMap = {
    '.rb': /get_flag\(['"]([^'"]+)['"]/g, // Ruby
    '.py': /get_flag\(['"]([^'"]+)['"]/g, // Python
    '.js': /getFlag\(['"]([^'"]+)['"]/g, // Node.js
    '.ts': /getFlag\(['"]([^'"]+)['"]/g, // TypeScript
    '.jsx': /useGetFlag\(['"]([^'"]+)['"]/g, // React JSX
    '.tsx': /useGetFlag\(['"]([^'"]+)['"]/g, // React TSX
    '.php': /getFlag\(['"]([^'"]+)['"]\)/g, // PHP
    '.java': /getFlag\(['"]([^'"]+)['"]/g, // Java
    '.cs': /getFlag\(['"]([^'"]+)['"]\)/g, // C#
    '.kt': /getFlag\(['"]([^'"]+)['"]\)/g, // Kotlin
    '.dart': /getFlag\(['"]([^'"]+)['"]\)/g, // Dart
    '.swift': /getFlag\(['"]([^'"]+)['"]\)/g, // Swift
};
/**
 * Scans files with the given extension in a directory for get_flag('feature_key', ...) patterns and returns all matches.
 * @param dir Directory to scan
 * @param extension File extension (e.g., '.rb', '.js')
 * @returns Object with detectedFlags array containing flagKey and codeReferences
 */
async function scanCodebaseForFeatureFlags(dir, extension) {
    console.error(`Scanning codebase for feature flags in ${dir} with extension ${extension}`);
    const flagMap = new Map();
    const regex = extensionToRegexMap[extension];
    try {
        const pattern = `${dir}/**/*${extension}`;
        const files = await (0, glob_1.glob)(pattern, { nodir: true });
        for (const file of files) {
            try {
                const data = await fs.readFile(file, 'utf-8');
                const lines = data.split('\n');
                // Extract file name and location
                const fileName = path.basename(file);
                const fileLocation = path.dirname(file);
                let match;
                while ((match = regex.exec(data)) !== null) {
                    // Find which line contains this match
                    const matchIndex = match.index;
                    let currentIndex = 0;
                    let lineNumber = 1;
                    for (let i = 0; i < lines.length; i++) {
                        const lineLength = lines[i].length + 1; // +1 for newline character
                        if (currentIndex + lineLength > matchIndex) {
                            lineNumber = i + 1; // Line numbers are 1-indexed
                            break;
                        }
                        currentIndex += lineLength;
                    }
                    // Calculate character position within the line
                    const charNumber = matchIndex - currentIndex + 1;
                    // Get the code snippet (the full line containing the match)
                    const referenceCode = lines[lineNumber - 1] || '';
                    const featureKey = match[1];
                    const codeReference = {
                        fileName,
                        fileLocation,
                        lineNumber,
                        charNumber,
                        referenceCode: referenceCode.trim(),
                    };
                    // Group by feature key
                    if (!flagMap.has(featureKey)) {
                        flagMap.set(featureKey, []);
                    }
                    flagMap.get(featureKey).push(codeReference);
                }
            }
            catch (err) {
                console.error(`Error reading file ${file}:`, err);
            }
        }
    }
    catch (err) {
        console.error('Error finding files:', err);
    }
    // Convert map to the required format
    const detectedFlags = Array.from(flagMap.entries()).map(([flagKey, codeReferences]) => ({
        flagKey,
        codeReferences,
    }));
    return detectedFlags;
}
/**
 * Enrich recommendations with code references. This is used to add code references to the recommendations.
 * @param recommendations - The recommendations to enrich
 * @param detectedFlags - The detected flags
 * @returns The enriched recommendations
 */
function enrichRecommendationsWithReferences(recommendations, detectedFlags) {
    return recommendations.reduce((acc, flag) => {
        if (flag.action !== 'No action required.') {
            const detected = detectedFlags.find((d) => d.flagKey === flag.flagKey);
            acc.push({
                ...flag,
                codeReferences: detected ? detected.codeReferences : [],
            });
        }
        return acc;
    }, []);
}
//# sourceMappingURL=TechDebtUtil.js.map