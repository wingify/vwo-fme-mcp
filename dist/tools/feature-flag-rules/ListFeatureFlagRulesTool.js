"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFeatureFlagRulesTool = void 0;
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
const ListFeatureFlagRulesSchema_1 = require("../../schema/ListFeatureFlagRulesSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
class ListFeatureFlagRulesTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'ListFeatureFlagRules';
        const description = 'List all feature flag rules per environment';
        const inputSchema = ListFeatureFlagRulesSchema_1.ListFeatureFlagRulesSchema;
        super(name, description, inputSchema);
    }
    /**
     * List all feature flag rules per environment
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        const result = await VWORestAPI_1.VWORestAPI.Instance.getFeatureFlagRules(args.environmentIdOrKey, args.featureIdOrKey, args.limit, args.offset);
        const response = (0, ResponseMessages_1.formatGenericResponse)(`Feature flag rules fetched successfully. Result: ${JSON.stringify(result, null, 2)}`, args.sdk);
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
exports.ListFeatureFlagRulesTool = ListFeatureFlagRulesTool;
//# sourceMappingURL=ListFeatureFlagRulesTool.js.map