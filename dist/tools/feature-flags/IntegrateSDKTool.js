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
exports.IntegrateSDKTool = void 0;
const IntegrateSDKSchema_1 = require("../../schema/IntegrateSDKSchema");
const BaseTool_1 = require("../BaseTool");
const GetDocumentationData_1 = require("../../utils/GetDocumentationData");
class IntegrateSDKTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'IntegrateVWOSDK';
        const description = 'Integrate the VWO FME SDK code';
        const inputSchema = IntegrateSDKSchema_1.IntegrateSDKSchema;
        super(name, description, inputSchema);
    }
    /**
     * Integrate the SDK code
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        const { sdk } = args;
        const sdkReadme = await (0, GetDocumentationData_1.fetchFilteredSdkReadme)(sdk);
        return {
            content: [
                {
                    type: 'text',
                    text: `Below is the documentation for the SDK. Please implement and correctly integrate the feature flag according to the documentation.
                ${sdkReadme}
                `,
                },
            ],
        };
    }
}
exports.IntegrateSDKTool = IntegrateSDKTool;
//# sourceMappingURL=IntegrateSDKTool.js.map