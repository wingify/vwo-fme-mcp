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
exports.CreateFeatureFlagRulesTool = void 0;
const CreateFeatureFlagRulesSchema_1 = require("../../schema/CreateFeatureFlagRulesSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
class CreateFeatureFlagRulesTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'CreateFeatureFlagRules';
        const description = 'Create a single or multiple feature flag rules';
        const inputSchema = CreateFeatureFlagRulesSchema_1.CreateFeatureFlagRulesSchema;
        super(name, description, inputSchema);
    }
    async execute(args) {
        const createFeatureRuleResult = await VWORestAPI_1.VWORestAPI.Instance.createMultipleFeatureFlagRules(args.environmentIdOrKey, args.featureIdOrKey, args.featureRule);
        const response = (0, ResponseMessages_1.formatGenericResponse)(`Feature rules created successfully. Result: ${JSON.stringify(createFeatureRuleResult, null, 2)}`, args.sdk);
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
exports.CreateFeatureFlagRulesTool = CreateFeatureFlagRulesTool;
//# sourceMappingURL=CreateFeatureFlagRulesTool.js.map