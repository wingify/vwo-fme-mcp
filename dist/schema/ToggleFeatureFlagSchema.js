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
exports.ToggleFeatureFlagSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.ToggleFeatureFlagSchema = {
    isEnabled: zod_1.z.boolean().default(true).describe('Toggle the feature flag on or off.'),
    environmentIdOrKey: zod_1.z.string().describe('The environment id or key of the environment.'),
    featureIdOrKey: zod_1.z.string().describe('The feature id or key of the feature.'),
    sdk: zod_1.z
        .enum(Object.values(constants_1.SUPPORTED_SDK))
        .describe('Check the SDK using the file extension and select the SDK accordingly.'),
};
//# sourceMappingURL=ToggleFeatureFlagSchema.js.map