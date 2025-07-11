"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_FILE_EXTENSIONS = exports.SUPPORTED_SDK = exports.FEATURE_FLAG_PERSISTENCE_TYPES = exports.FEATURE_FLAG_TYPES = exports.URL = void 0;
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
exports.URL = {
    VWO_API: 'https://app.vwo.com/api/v2/accounts',
    VWO_APP: 'https://app.vwo.com',
    GITHUB_WINGIFY_BASE_URL: 'https://raw.githubusercontent.com/wingify/',
};
exports.FEATURE_FLAG_TYPES = {
    FLAG_ROLLOUT: 'FLAG_ROLLOUT',
    FLAG_TESTING: 'FLAG_TESTING',
    FLAG_PERSONALIZE: 'FLAG_PERSONALIZE',
    FLAG_MULTIVARIATE: 'FLAG_MULTIVARIATE',
};
exports.FEATURE_FLAG_PERSISTENCE_TYPES = {
    TEMPORARY: 'TEMPORARY',
    PERMANENT: 'PERMANENT',
};
exports.SUPPORTED_SDK = {
    NODE: 'node',
    JAVASCRIPT: 'javascript',
    NEXTJS: 'nextjs',
    JAVA: 'java',
    PYTHON: 'python',
    REACT: 'react-web',
    PHP: 'php',
    RUBY: 'ruby',
    ANDROID: 'android',
    DOTNET: 'dotnet',
    FLUTTER: 'flutter',
    IOS: 'ios',
    REACT_NATIVE: 'react-native',
    GO: 'go',
};
exports.SUPPORTED_FILE_EXTENSIONS = {
    RUBY: '.rb',
    PYTHON: '.py',
    JAVASCRIPT: '.js',
    TYPESCRIPT: '.ts',
    REACT: '.jsx',
    REACT_TS: '.tsx',
    PHP: '.php',
    JAVA: '.java',
    C_SHARP: '.cs',
    KOTLIN: '.kt',
    DART: '.dart',
    SWIFT: '.swift',
};
//# sourceMappingURL=constants.js.map