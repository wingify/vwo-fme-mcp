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
exports.CreateFeatureFlagWithDefaultsSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
const CreateFeatureFlagRulesSchema_1 = require("./CreateFeatureFlagRulesSchema");
exports.CreateFeatureFlagWithDefaultsSchema = {
    featureKey: zod_1.z
        .string()
        .describe("The key of the feature flag. Should only contain alphanumeric characters and underscores. Should be self explanatory according to the user's usercase."),
    environmentIdOrKey: zod_1.z
        .string()
        .default('3')
        .describe('Use default environment id if no information is provided by user related to environment.'),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    sdk: zod_1.z
        .enum(Object.values(constants_1.SUPPORTED_SDK))
        .describe('Prompt the user to select the SDK from the list of supported SDKs, if the SDK is not already selected. Ask the user to confirm the SDK before proceeding. Check the language using the file extension and select the SDK accordingly.'),
    featureType: zod_1.z
        .enum([constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.TEMPORARY, constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.PERMANENT])
        .default(constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.TEMPORARY),
    goals: zod_1.z
        .array(zod_1.z.object({
        metricName: zod_1.z.string().default('Default Metric MCP'),
    }))
        .describe('Use default metric name if no information is provided by user related to metric.'),
    variables: zod_1.z
        .array(zod_1.z.object({
        variableName: zod_1.z
            .string()
            .describe('variable name should be self explanatory according to the feature key and usercase'),
        dataType: zod_1.z.enum(['boolean', 'string', 'int', 'float', 'json']),
        defaultValue: zod_1.z
            .boolean()
            .or(zod_1.z.string())
            .or(zod_1.z.number())
            .or(zod_1.z.object({}).describe('for Json data type, object should be stringified').passthrough()),
    }))
        .min(1)
        .describe('Variables are used to store the data for the feature flag'),
    variations: zod_1.z
        .array(zod_1.z
        .object({
        name: zod_1.z
            .string()
            .describe('variation name should be self explanatory according to the feature key and usercase'),
        key: zod_1.z.string(),
        variables: zod_1.z.array(zod_1.z.object({
            variableId: zod_1.z.number(),
            value: zod_1.z
                .boolean()
                .or(zod_1.z.string())
                .or(zod_1.z.number())
                .or(zod_1.z
                .object({})
                .describe('for Json data type, object should be stringified')
                .passthrough()),
        })),
    })
        .describe('New Variations of the feature flag with different variable values excluding the default variation.'))
        .min(1)
        .max(1)
        .describe('At least one variation is required with different variable value'),
    featureRule: CreateFeatureFlagRulesSchema_1.featureRuleSchema.describe('Feature rule to be created for the feature flag. If not provided, create one rollout and one testing rule.'),
};
//# sourceMappingURL=CreateFeatureFlagWithDefaultsSchema.js.map