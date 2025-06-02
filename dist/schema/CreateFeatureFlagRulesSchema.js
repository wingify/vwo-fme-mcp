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
exports.CreateFeatureFlagTestingAndMultivariateRuleSchema = exports.CreateFeatureFlagRolloutAndPersonalizeRuleSchema = void 0;
const constants_1 = require("../constants");
const zod_1 = require("zod");
exports.CreateFeatureFlagRolloutAndPersonalizeRuleSchema = {
    environmentIdOrKey: zod_1.z.string(),
    featureIdOrKey: zod_1.z.string(),
    key: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z
        .enum([constants_1.FEATURE_FLAG_TYPES.FLAG_ROLLOUT, constants_1.FEATURE_FLAG_TYPES.FLAG_PERSONALIZE])
        .default(constants_1.FEATURE_FLAG_TYPES.FLAG_ROLLOUT),
    campaignData: zod_1.z.object({
        percentSplit: zod_1.z
            .number()
            .default(100)
            .describe('The percentage of the traffic for the rollout or personalize rule'),
        variations: zod_1.z
            .array(zod_1.z.object({
            featureVariationId: zod_1.z
                .number()
                .describe('The feature variation id to be used for the personalize rule only'),
        }))
            .optional()
            .describe('The variations to be used for the personalize rule only'),
    }),
};
exports.CreateFeatureFlagTestingAndMultivariateRuleSchema = {
    environmentIdOrKey: zod_1.z.string(),
    featureIdOrKey: zod_1.z.string(),
    key: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z
        .enum([constants_1.FEATURE_FLAG_TYPES.FLAG_TESTING, constants_1.FEATURE_FLAG_TYPES.FLAG_MULTIVARIATE])
        .default(constants_1.FEATURE_FLAG_TYPES.FLAG_TESTING),
    campaignData: zod_1.z.object({
        percentSplit: zod_1.z
            .number()
            .default(100)
            .describe('The percentage of the traffic to allocate to testing or multivariate rule'),
        variations: zod_1.z.array(zod_1.z.object({
            percentSplit: zod_1.z
                .number()
                .default(50)
                .describe('The percentage of the traffic to allocate to this variation'),
            featureVariationId: zod_1.z.number(),
        })),
    }),
};
//# sourceMappingURL=CreateFeatureFlagRulesSchema.js.map