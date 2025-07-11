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

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

export interface CodeReference {
  fileName: string;
  fileLocation: string;
  lineNumber: number;
  charNumber: number;
  referenceCode: string;
}

export interface DetectedFlag {
  flagKey: string;
  codeReferences: CodeReference[];
}

// Map file extensions to their corresponding regex patterns
const extensionToRegexMap: { [key: string]: RegExp } = {
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
export async function scanCodebaseForFeatureFlags(
  dir: string,
  extension: string,
): Promise<DetectedFlag[]> {
  console.error(`Scanning codebase for feature flags in ${dir} with extension ${extension}`);
  const flagMap = new Map<string, CodeReference[]>();
  const regex = extensionToRegexMap[extension];

  try {
    const pattern = `${dir}/**/*${extension}`;
    const files: string[] = await glob(pattern, { nodir: true });

    for (const file of files) {
      try {
        const data: string = await fs.readFile(file, 'utf-8');
        const lines = data.split('\n');

        // Extract file name and location
        const fileName = path.basename(file);
        const fileLocation = path.dirname(file);

        let match: RegExpExecArray | null;
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
          const codeReference: CodeReference = {
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
          flagMap.get(featureKey)!.push(codeReference);
        }
      } catch (err) {
        console.error(`Error reading file ${file}:`, err);
      }
    }
  } catch (err) {
    console.error('Error finding files:', err);
  }

  // Convert map to the required format
  const detectedFlags: DetectedFlag[] = Array.from(flagMap.entries()).map(
    ([flagKey, codeReferences]) => ({
      flagKey,
      codeReferences,
    }),
  );

  return detectedFlags;
}

/**
 * Enrich recommendations with code references. This is used to add code references to the recommendations.
 * @param recommendations - The recommendations to enrich
 * @param detectedFlags - The detected flags
 * @returns The enriched recommendations
 */
export function enrichRecommendationsWithReferences(
  recommendations: any[],
  detectedFlags: DetectedFlag[],
): any[] {
  return (recommendations as any[]).reduce((acc, flag) => {
    if (flag.action !== 'No action required.') {
      const detected = detectedFlags.find((d: any) => d.flagKey === flag.flagKey);
      acc.push({
        ...flag,
        codeReferences: detected ? detected.codeReferences : [],
      });
    }
    return acc;
  }, []);
}
