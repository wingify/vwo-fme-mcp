"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTool = void 0;
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
class BaseTool {
    constructor(name, description, inputSchema) {
        this.name = name;
        this.description = description;
        this.inputSchema = inputSchema;
    }
    getDefinition() {
        return {
            name: this.name,
            description: this.description,
            inputSchema: this.inputSchema,
        };
    }
}
exports.BaseTool = BaseTool;
//# sourceMappingURL=BaseTool.js.map