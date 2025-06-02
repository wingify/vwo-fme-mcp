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
    featureKey: zod_1.z.string(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    featureType: zod_1.z
        .enum([constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.TEMPORARY, constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.PERMANENT])
        .default(constants_1.FEATURE_FLAG_PERSISTENCE_TYPES.TEMPORARY),
    goals: zod_1.z
        .array(zod_1.z.object({
        metricName: zod_1.z.string(),
    }))
        .optional(),
    variables: zod_1.z
        .array(zod_1.z.object({
        variableName: zod_1.z.string(),
        dataType: zod_1.z.enum(['boolean', 'string', 'int', 'float', 'json']),
        defaultValue: zod_1.z
            .boolean()
            .or(zod_1.z.string())
            .or(zod_1.z.number())
            .or(zod_1.z.object({}).describe('for Json data type, object should be stringified').passthrough()),
    }))
        .optional(),
};
//# sourceMappingURL=CreateFeatureFlagSchema.js.map