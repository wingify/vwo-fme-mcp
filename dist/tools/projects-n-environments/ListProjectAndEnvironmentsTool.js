"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProjectAndEnvironmentsTool = void 0;
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
const ListProjectAndEnvironmentsSchema_1 = require("../../schema/ListProjectAndEnvironmentsSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
class ListProjectAndEnvironmentsTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'ListProjectAndEnvironments';
        const description = 'List FME project and associated environments';
        const inputSchema = ListProjectAndEnvironmentsSchema_1.ListProjectAndEnvironmentsSchema;
        super(name, description, inputSchema);
    }
    /**
     * List all projects and associated environments
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        const result = await VWORestAPI_1.VWORestAPI.Instance.getProjectsAndEnvironments();
        const response = (0, ResponseMessages_1.formatProjectsAndEnvironmentsResponse)(result);
        return {
            content: [
                {
                    type: 'text',
                    text: response,
                },
            ],
        };
    }
}
exports.ListProjectAndEnvironmentsTool = ListProjectAndEnvironmentsTool;
//# sourceMappingURL=ListProjectAndEnvironmentsTool.js.map