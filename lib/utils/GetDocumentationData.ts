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

import * as https from 'https';
import { URL } from '../constants';
/**
 * Map of SDKs to their README files
 */
export const sdkReadmeMap: Record<string, string> = {
  node: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-node-sdk/master/README.md`,
  javascript: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-node-sdk/master/README.md`,
  typescript: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-node-sdk/master/README.md`,
  nextjs: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-node-sdk/master/README.md`,
  java: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-java-sdk/master/README.md`,
  python: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-python-sdk/master/README.md`,
  php: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-php-sdk/master/README.md`,
  ruby: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-ruby-sdk/master/README.md`,
  'react-web': `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-react-sdk/master/README.md`,
  flutter: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-flutter-sdk/master/README.md`,
  ios: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-ios-sdk/master/README.md`,
  android: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-android-sdk/master/README.md`,
  'react-native': `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-react-native-sdk/master/README.md`,
  dotnet: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-dotnet-sdk/master/README.md`,
  'c#': `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-dotnet-sdk/master/README.md`,
  go: `${URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-go-sdk/master/README.md`,
};

/**
 * Base URL for SDK documentation
 */
export const sdkDocumentationLink = 'https://developers.vwo.com/v2/docs/fme-';

/**
 * Fetches the README for a given SDK
 */
export async function fetchSdkReadme(sdk: string): Promise<string> {
  const url = sdkReadmeMap[sdk.toLowerCase()];
  if (!url) {
    throw new Error(`No README mapping found for SDK/language: ${sdk}`);
  }
  return new Promise((resolve, reject) => {
    let data = '';
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch README: ${res.statusCode}`));
          return;
        }
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

/**
 * Fetches the README for a given SDK and returns only relevant sections
 * Extracts two specific sections:
 * 1. From ## Installation to ## Advanced Configuration Options
 * 2. From ### User Context to ### Version History
 */
export async function fetchFilteredSdkReadme(sdk: string): Promise<string> {
  const sdkReadme = await fetchSdkReadme(sdk);

  // Parse the README to extract two specific sections:
  // 1. From ## Installation to ## Advanced Configuration Options
  // 2. From ### User Context to ### Version History
  const installationIndex = sdkReadme.indexOf('## Installation');
  const advancedConfigIndex = sdkReadme.indexOf('## Advanced Configuration Options');
  const userContextIndex = sdkReadme.indexOf('### User Context');
  const versionHistoryIndex = sdkReadme.indexOf('### Version History');

  let relevantContent = '';

  // Extract first section: Installation to Advanced Configuration Options
  if (installationIndex !== -1 && advancedConfigIndex !== -1) {
    const installationSection = sdkReadme.substring(installationIndex, advancedConfigIndex).trim();
    relevantContent += installationSection;
  } else if (installationIndex !== -1) {
    // If Advanced Configuration Options not found, take from Installation to end (or Version History)
    const endIndex = versionHistoryIndex !== -1 ? versionHistoryIndex : sdkReadme.length;
    const installationSection = sdkReadme.substring(installationIndex, endIndex).trim();
    relevantContent += installationSection;
  }

  // Extract second section: User Context to Version History
  if (userContextIndex !== -1 && versionHistoryIndex !== -1) {
    const userContextSection = sdkReadme.substring(userContextIndex, versionHistoryIndex).trim();
    if (relevantContent) {
      relevantContent += '\n\n' + userContextSection;
    } else {
      relevantContent = userContextSection;
    }
  } else if (userContextIndex !== -1) {
    // If Version History not found, take from User Context to end
    const userContextSection = sdkReadme.substring(userContextIndex).trim();
    if (relevantContent) {
      relevantContent += '\n\n' + userContextSection;
    } else {
      relevantContent = userContextSection;
    }
  }

  return relevantContent;
}

/**
 * Fetches the documentation link for the getFlag method
 */
export function fetchGetFlagDocumentationLink(sdk: string): string {
  return `${sdkDocumentationLink}${sdk.toLowerCase()}-flags`;
}

/**
 * Fetches the documentation link for the metrics
 */
export function fetchMetricsDocumentationLink(sdk: string): string {
  return `${sdkDocumentationLink}${sdk.toLowerCase()}-metrics`;
}
