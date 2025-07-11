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
exports.sdkDocumentationLink = exports.sdkReadmeMap = void 0;
exports.fetchSdkReadme = fetchSdkReadme;
exports.fetchFilteredSdkReadme = fetchFilteredSdkReadme;
exports.fetchGetFlagDocumentationLink = fetchGetFlagDocumentationLink;
exports.fetchMetricsDocumentationLink = fetchMetricsDocumentationLink;
const https = __importStar(require("https"));
const constants_1 = require("../constants");
/**
 * Map of SDKs to their README files
 */
exports.sdkReadmeMap = {
    node: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-node-sdk/master/README.md`,
    javascript: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-node-sdk/master/README.md`,
    typescript: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-node-sdk/master/README.md`,
    nextjs: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-node-sdk/master/README.md`,
    java: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-java-sdk/master/README.md`,
    python: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-python-sdk/master/README.md`,
    php: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-php-sdk/master/README.md`,
    ruby: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-ruby-sdk/master/README.md`,
    'react-web': `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-react-sdk/master/README.md`,
    flutter: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-flutter-sdk/master/README.md`,
    ios: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-ios-sdk/master/README.md`,
    android: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-android-sdk/master/README.md`,
    'react-native': `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-react-native-sdk/master/README.md`,
    dotnet: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-dotnet-sdk/master/README.md`,
    'c#': `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-dotnet-sdk/master/README.md`,
    go: `${constants_1.URL.GITHUB_WINGIFY_BASE_URL}vwo-fme-go-sdk/master/README.md`,
};
/**
 * Base URL for SDK documentation
 */
exports.sdkDocumentationLink = 'https://developers.vwo.com/v2/docs/fme-';
/**
 * Fetches the README for a given SDK
 */
async function fetchSdkReadme(sdk) {
    const url = exports.sdkReadmeMap[sdk.toLowerCase()];
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
async function fetchFilteredSdkReadme(sdk) {
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
    }
    else if (installationIndex !== -1) {
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
        }
        else {
            relevantContent = userContextSection;
        }
    }
    else if (userContextIndex !== -1) {
        // If Version History not found, take from User Context to end
        const userContextSection = sdkReadme.substring(userContextIndex).trim();
        if (relevantContent) {
            relevantContent += '\n\n' + userContextSection;
        }
        else {
            relevantContent = userContextSection;
        }
    }
    return relevantContent;
}
/**
 * Fetches the documentation link for the getFlag method
 */
function fetchGetFlagDocumentationLink(sdk) {
    return `${exports.sdkDocumentationLink}${sdk.toLowerCase()}-flags`;
}
/**
 * Fetches the documentation link for the metrics
 */
function fetchMetricsDocumentationLink(sdk) {
    return `${exports.sdkDocumentationLink}${sdk.toLowerCase()}-metrics`;
}
//# sourceMappingURL=GetDocumentationData.js.map