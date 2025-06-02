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
exports.BootStrapVWO = void 0;
const BaseTool_1 = require("../BaseTool");
const writeCursorRuleUtil_1 = require("../../utils/writeCursorRuleUtil");
const BootStrapVWOSchema_1 = require("../../schema/BootStrapVWOSchema");
class BootStrapVWO extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'BootStrapVWO';
        const description = 'BootStrap VWO';
        const inputSchema = BootStrapVWOSchema_1.BootStrapVWOSchema;
        super(name, description, inputSchema);
    }
    /**
     * BootStrap VWO
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        console.error('Bootstrapping VWO', args);
        (0, writeCursorRuleUtil_1.writeCursorRuleToUserDir)(args.targetDir, args.sdk);
        return {
            content: [
                {
                    type: 'text',
                    text: `Bootstrapping VWO done.`,
                },
            ],
        };
    }
}
exports.BootStrapVWO = BootStrapVWO;
//# sourceMappingURL=BootStrapVWO.js.map