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
exports.CreateFeatureFlagSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.CreateFeatureFlagSchema = {
    featureKey: zod_1.z
        .string()
        .describe("The key of the feature flag. Should only contain alphanumeric characters and underscores. Should be self explanatory according to the user's usercase."),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    sdk: zod_1.z
        .enum(Object.values(constants_1.SUPPORTED_SDK))
        .describe('Check the language using the file extension and select the SDK from the list of supported SDKs. Prompt the user to confirm the SDK before proceeding.'),
    featureType: zod_1.z
        .enum([constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.TEMPORARY, constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.PERMANENT])
        .default(constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.TEMPORARY),
    goals: zod_1.z
        .array(zod_1.z.object({
        metricName: zod_1.z.string().default('Default Metric MCP'),
    }))
        .optional()
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
        .describe('Variables are used to store the data for the feature flag'),
};
//# sourceMappingURL=CreateFeatureFlagSchema.js.map