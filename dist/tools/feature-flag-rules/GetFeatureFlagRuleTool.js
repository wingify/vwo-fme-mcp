"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFeatureFlagRuleTool = void 0;
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
const GetFeatureFlagRuleSchema_1 = require("../../schema/GetFeatureFlagRuleSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
class GetFeatureFlagRuleTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'GetFeatureFlagRule';
        const description = 'Get details of a feature flag rule';
        const inputSchema = GetFeatureFlagRuleSchema_1.GetFeatureFlagRuleSchema;
        super(name, description, inputSchema);
    }
    /**
     * Get a feature flag rule
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        console.error('Getting a feature flag rule', args);
        const result = await VWORestAPI_1.VWORestAPI.Instance.getFeatureFlagRule(args.environmentIdOrKey, args.featureIdOrKey, args.ruleId);
        return {
            content: [
                {
                    type: 'text',
                    text: `Feature flag rule "${args.ruleId}" get successfully. Result: ${JSON.stringify(result)}`,
                },
            ],
        };
    }
}
exports.GetFeatureFlagRuleTool = GetFeatureFlagRuleTool;
//# sourceMappingURL=GetFeatureFlagRuleTool.js.map