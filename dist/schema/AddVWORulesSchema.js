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
exports.AddVWORulesSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.AddVWORulesSchema = {
    targetDir: zod_1.z.string().describe('The current working directory to write the cursor rules'),
    sdk: zod_1.z
        .enum(Object.values(constants_1.SUPPORTED_SDK))
        .describe('Check the SDK using the file extension and select the SDK accordingly. Confirm the SDK before proceeding.'),
    whichIde: zod_1.z.enum(['cursor', 'vscode']).describe('The IDE to write the cursor rules for'),
};
//# sourceMappingURL=AddVWORulesSchema.js.map