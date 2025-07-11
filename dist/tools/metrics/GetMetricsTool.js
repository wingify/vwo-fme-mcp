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
exports.GetMetricsTool = void 0;
const BaseTool_1 = require("../BaseTool");
const GetMetricsSchema_1 = require("../../schema/GetMetricsSchema");
const VWORestAPI_1 = require("../../services/VWORestAPI");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
class GetMetricsTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'GetMetrics';
        const description = 'Get the complete list of all available data360 metrics that can be used across the entire VWO account (not specific feature flag data)';
        const inputSchema = GetMetricsSchema_1.GetMetricsSchema;
        super(name, description, inputSchema);
    }
    /**
     * Get all available metrics
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        const result = await VWORestAPI_1.VWORestAPI.Instance.getMetrics();
        const response = (0, ResponseMessages_1.formatGenericResponse)(`Metrics fetched successfully. Result: ${JSON.stringify(result, null, 2)}`, args.sdk, true);
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
exports.GetMetricsTool = GetMetricsTool;
//# sourceMappingURL=GetMetricsTool.js.map