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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindStaleFeatureFlagsTool = void 0;
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
const FindStaleFeatureFlagsSchema_1 = require("../../schema/FindStaleFeatureFlagsSchema");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
class FindStaleFeatureFlagsTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'FindStaleFeatureFlags';
        const description = 'Find unused or stale VWO FME feature flags in the codebase';
        const inputSchema = FindStaleFeatureFlagsSchema_1.FindStaleFeatureFlagsSchema;
        super(name, description, inputSchema);
    }
    async execute(args) {
        const { sourceFolder, fileExtension, repoName, repoBranch } = args;
        const featureFlags = await VWORestAPI_1.VWORestAPI.Instance.getStaleFeatureFlags(sourceFolder, fileExtension, repoName, repoBranch);
        const response = (0, ResponseMessages_1.formatTechDebtResponse)(featureFlags);
        return {
            content: [
                {
                    type: 'text',
                    text: response,
                },
            ],
        };
    }
}
exports.FindStaleFeatureFlagsTool = FindStaleFeatureFlagsTool;
//# sourceMappingURL=FindStaleFeatureFlagsTool.js.map