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
exports.ListProjectAndEnvironmentsSchema = void 0;
const zod_1 = require("zod");
exports.ListProjectAndEnvironmentsSchema = {
    limit: zod_1.z.number().optional().default(10),
    offset: zod_1.z.number().optional().default(0),
};
//# sourceMappingURL=ListProjectAndEnvironmentsSchema.js.map