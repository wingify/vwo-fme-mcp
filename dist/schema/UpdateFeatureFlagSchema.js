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
exports.UpdateFeatureFlagSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.UpdateFeatureFlagSchema = {
    featureIdOrKey: zod_1.z.string(),
    name: zod_1.z.string().optional(),
    sdk: zod_1.z
        .enum(Object.values(constants_1.SUPPORTED_SDK))
        .describe('Check the SDK using the file extension and select the SDK accordingly.'),
    description: zod_1.z.string().optional(),
    goals: zod_1.z
        .array(zod_1.z.object({
        metricName: zod_1.z.string(),
    }))
        .optional(),
    variables: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z
            .number()
            .describe('ID of the variable. It is required only when user want to update the default variable value of the feature flag.')
            .optional(),
        variableName: zod_1.z.string(),
        dataType: zod_1.z.enum(['boolean', 'string', 'int', 'float', 'json']),
        defaultValue: zod_1.z
            .boolean()
            .or(zod_1.z.string())
            .or(zod_1.z.number())
            .or(zod_1.z.object({}).describe('for Json data type, object should be stringified').passthrough()),
    }))
        .optional(),
    variations: zod_1.z
        .array(zod_1.z
        .object({
        id: zod_1.z
            .number()
            .describe('ID of the variation. It is required only when user want to update the variation of the feature flag.')
            .optional(),
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
        .describe('New variations of the feature flag excluding default key.'))
        .optional(),
};
//# sourceMappingURL=UpdateFeatureFlagSchema.js.map