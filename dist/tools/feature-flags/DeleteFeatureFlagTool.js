"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFeatureFlagTool = void 0;
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
const DeleteFeatureFlagSchema_1 = require("../../schema/DeleteFeatureFlagSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
class DeleteFeatureFlagTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'DeleteFeatureFlag';
        const description = 'Delete a feature flag';
        const inputSchema = DeleteFeatureFlagSchema_1.DeleteFeatureFlagSchema;
        super(name, description, inputSchema);
    }
    /**
     * Delete a feature flag
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        const result = await VWORestAPI_1.VWORestAPI.Instance.deleteFeatureFlag(args.featureIdOrKey);
        return {
            content: [
                {
                    type: 'text',
                    text: `Feature flag "${args.featureIdOrKey}" deleted successfully. Result: ${JSON.stringify(result, null, 2)}`,
                },
            ],
        };
    }
}
exports.DeleteFeatureFlagTool = DeleteFeatureFlagTool;
//# sourceMappingURL=DeleteFeatureFlagTool.js.map