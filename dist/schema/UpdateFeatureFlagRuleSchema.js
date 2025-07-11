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
exports.UpdateFeatureFlagRuleSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.UpdateFeatureFlagRuleSchema = {
    featureIdOrKey: zod_1.z.string(),
    environmentIdOrKey: zod_1.z.string(),
    ruleIdOrKey: zod_1.z.string(),
    sdk: zod_1.z
        .enum(Object.values(constants_1.SUPPORTED_SDK))
        .describe('Check the SDK using the file extension and select the SDK accordingly.'),
    campaignData: zod_1.z
        .object({
        percentSplit: zod_1.z
            .number()
            .describe('If you want to update the traffic for the rule, you can provide the percentSplit. If not provided, current traffic will be used.'),
        variations: zod_1.z
            .array(zod_1.z.object({
            percentSplit: zod_1.z
                .number()
                .optional()
                .describe('If you want to update the traffic for the variation, you can provide the percentSplit. If not provided, current traffic will be used.'),
            featureVariationId: zod_1.z
                .number()
                .describe('If you want to update the variation, you can provide the featureVariationId. If not provided, current variation will be used.'),
        }))
            .optional(),
    })
        .describe('If you want to update the traffic for any rule, you can provide the campaignData.percentSplit. If not provided, the traffic will not be updated. For personalized rules, if you want to update the variation, you can provide the campaignData.variations.featureVariationId to update the variation. For testing rule, you can provide the campaignData.variations.percentSplit to update the traffic for the variation and also if you want to update the variation, you can provide the campaignData.variations.featureVariationId to update the variation.'),
};
//# sourceMappingURL=UpdateFeatureFlagRuleSchema.js.map