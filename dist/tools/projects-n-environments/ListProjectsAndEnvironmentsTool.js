"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProjectsAndEnvironmentsTool = void 0;
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
const ListProjectsAndEnvironmentsSchema_1 = require("../../schema/ListProjectsAndEnvironmentsSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
class ListProjectsAndEnvironmentsTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'ListProjectsAndEnvironments';
        const description = 'List all projects and associated environments';
        const inputSchema = ListProjectsAndEnvironmentsSchema_1.ListProjectsAndEnvironmentsSchema;
        super(name, description, inputSchema);
    }
    /**
     * List all projects and associated environments
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        console.error('Getting a feature flag', args);
        const result = await VWORestAPI_1.VWORestAPI.Instance.getProjectsAndEnvironments(args.limit, args.offset);
        console.error('Feature flag', result);
        return {
            content: [
                {
                    type: 'text',
                    text: `FME Projects and associated Environments fetched successfully. Result: ${JSON.stringify(result)}`,
                },
            ],
        };
    }
}
exports.ListProjectsAndEnvironmentsTool = ListProjectsAndEnvironmentsTool;
//# sourceMappingURL=ListProjectsAndEnvironmentsTool.js.map