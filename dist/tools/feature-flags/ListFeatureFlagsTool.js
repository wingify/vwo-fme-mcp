"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFeatureFlagsTool = void 0;
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
const ListFeatureFlagsSchema_1 = require("../../schema/ListFeatureFlagsSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
class ListFeatureFlagsTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'ListFeatureFlags';
        const description = 'List all feature flags';
        const inputSchema = ListFeatureFlagsSchema_1.ListFeatureFlagsSchema;
        super(name, description, inputSchema);
    }
    /**
     * List all feature flags
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        console.error('Getting list of feature flags', args);
        const result = await VWORestAPI_1.VWORestAPI.Instance.listFeatureFlags(args.limit, args.offset);
        console.error('List of feature flags', result);
        return {
            content: [
                {
                    type: 'text',
                    text: `Feature flags fetched successfully. Result: ${JSON.stringify(result)}`,
                },
            ],
        };
    }
}
exports.ListFeatureFlagsTool = ListFeatureFlagsTool;
//# sourceMappingURL=ListFeatureFlagsTool.js.map