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
exports.ToggleFeatureFlagTool = void 0;
const ToggleFeatureFlagAndRulesSchema_1 = require("../../schema/ToggleFeatureFlagAndRulesSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
class ToggleFeatureFlagTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'ToggleFeatureFlag';
        const description = 'Toggle a feature flag';
        const inputSchema = ToggleFeatureFlagAndRulesSchema_1.ToggleFeatureFlagAndRulesSchema;
        super(name, description, inputSchema);
    }
    /**
     * Toggle a feature flag
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        console.error('Toggling feature flag', args);
        const result = await VWORestAPI_1.VWORestAPI.Instance.toggleFeatureFlag(args.environmentIdOrKey, args.featureIdOrKey, args.isEnabled);
        return {
            content: [
                {
                    type: 'text',
                    text: `Feature flag "${args.featureIdOrKey}" toggled successfully. Result: ${JSON.stringify(result)}`,
                },
            ],
        };
    }
}
exports.ToggleFeatureFlagTool = ToggleFeatureFlagTool;
//# sourceMappingURL=ToggleFeatureFlagTool.js.map