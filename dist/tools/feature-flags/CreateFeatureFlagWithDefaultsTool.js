"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFeatureFlagWithDefaultsTool = void 0;
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
const CreateFeatureFlagWithDefaultsSchema_1 = require("../../schema/CreateFeatureFlagWithDefaultsSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
class CreateFeatureFlagWithDefaultsTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'CreateFeatureFlagWithDefaults';
        const description = 'Create a new ready-to-use feature flag with smart default values';
        const inputSchema = CreateFeatureFlagWithDefaultsSchema_1.CreateFeatureFlagWithDefaultsSchema;
        super(name, description, inputSchema);
    }
    /**
     * Create a new feature flag
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        const createBasicFeatureFlagResult = await VWORestAPI_1.VWORestAPI.Instance.createFeatureFlag(args.featureKey, args.name, args.description, args.featureType, args.goals, args.variables);
        const updateFeatureFlagResult = await VWORestAPI_1.VWORestAPI.Instance.updateFeatureFlag(args.featureKey, undefined, undefined, undefined, undefined, args.variations);
        const createFeatureRuleResult = await VWORestAPI_1.VWORestAPI.Instance.createMultipleFeatureFlagRules(args.environmentIdOrKey, args.featureKey, args.featureRule);
        let ruleIds = [];
        if (Array.isArray(createFeatureRuleResult === null || createFeatureRuleResult === void 0 ? void 0 : createFeatureRuleResult._data)) {
            ruleIds = createFeatureRuleResult._data.map((item) => {
                if (item.id) {
                    return item.id;
                }
            });
        }
        // 4. Enable all feature flag rules
        const enableFeatureFlagRulesResult = await VWORestAPI_1.VWORestAPI.Instance.toggleMultipleFeatureFlagRules(args.environmentIdOrKey, args.featureKey, true, ruleIds);
        const enableFeatureFlagResult = await VWORestAPI_1.VWORestAPI.Instance.toggleFeatureFlag(args.environmentIdOrKey, args.featureKey, true);
        const response = (0, ResponseMessages_1.formatReadyToUseFeatureFlagCreationResponse)(args.featureKey, args.environmentIdOrKey, createBasicFeatureFlagResult, args.sdk);
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
exports.CreateFeatureFlagWithDefaultsTool = CreateFeatureFlagWithDefaultsTool;
//# sourceMappingURL=CreateFeatureFlagWithDefaultsTool.js.map