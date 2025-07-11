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
exports.CreateFeatureFlagRulesSchema = exports.featureRuleSchema = exports.ruleSchema = void 0;
const constants_1 = require("../constants");
const zod_1 = require("zod");
exports.ruleSchema = zod_1.z
    .object({
    name: zod_1.z.string().describe('Name of the rule'),
    key: zod_1.z.string().describe('Unique key of the rule'),
    type: zod_1.z
        .enum([
        constants_1.FEATURE_FLAG_TYPES.FLAG_ROLLOUT,
        constants_1.FEATURE_FLAG_TYPES.FLAG_TESTING,
        constants_1.FEATURE_FLAG_TYPES.FLAG_MULTIVARIATE,
        constants_1.FEATURE_FLAG_TYPES.FLAG_PERSONALIZE,
    ])
        .describe('FLAG_ROLLOUT is used to rollout the feature flag to a percentage of the users. FLAG_TESTING is used to test the feature flag with a percentage of the users. FLAG_MULTIVARIATE is used to test the feature flag with multiple variations. FLAG_PERSONALIZE is used to personalize the feature flag using single variation.'),
    campaignData: zod_1.z.object({
        percentSplit: zod_1.z
            .number()
            .default(100)
            .describe('Traffic for the rule. If not provided, 100% traffic will be allocated to the rule.'),
        variations: zod_1.z
            .array(zod_1.z.object({
            percentSplit: zod_1.z.number().default(50).describe('Traffic to allocate to this variation.'),
            featureVariationId: zod_1.z.number().describe('ID of the variation'),
        }))
            .optional(),
    }),
})
    .describe('For Rollout rule, only percentSplit is required. For Testing rule, variations are required and variations array must have at least 2 objects having featureVariationId and percentSplit. For Personalize rule, variations are required and must have exactly 1 object having featureVariationId and percentSplit.\
    Each rule has its individual traffic allocation. If not provided, 100% traffic will be allocated to each rule. Incase of Testing rule, the traffic will be split between the variations. If not provided, 50% traffic will be allocated to each variation.');
exports.featureRuleSchema = zod_1.z.object({
    rules: zod_1.z.array(exports.ruleSchema).min(1, { message: 'At least one rule is required' }),
});
exports.CreateFeatureFlagRulesSchema = {
    environmentIdOrKey: zod_1.z
        .string()
        .describe('Prompt the user to select the environment id or key from the list of environments.'),
    featureIdOrKey: zod_1.z
        .string()
        .describe('Prompt the user to select the feature id or key from the list of features.'),
    sdk: zod_1.z
        .enum(Object.values(constants_1.SUPPORTED_SDK))
        .describe('Check the SDK using the file extension and select the SDK accordingly.'),
    featureRule: exports.featureRuleSchema.describe('Feature rule to be created for the feature flag. If not provided, create one rollout and one testing rule.'),
};
//# sourceMappingURL=CreateFeatureFlagRulesSchema.js.map