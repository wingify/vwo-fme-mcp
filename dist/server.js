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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VWOMCPServer = void 0;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = require("./config/index");
const constants_1 = require("./constants");
const VWORestAPI_1 = require("./services/VWORestAPI");
const tools_1 = require("./tools");
class VWOMCPServer {
    constructor(config) {
        this.server = new mcp_js_1.McpServer({
            name: config.name,
            version: config.version,
        }, {
            capabilities: {
                resources: {}, // Enable resources
            },
        });
        this.config = {
            name: config.name,
            version: config.version,
        };
        this.api = new VWORestAPI_1.VWORestAPI({
            baseURL: constants_1.URL.VWO_API,
            apiKey: index_1.VWOConfig.apiKey,
            accountId: index_1.VWOConfig.accountId,
        });
        this.tools = new Map();
        this.registerTools();
    }
    registerTools() {
        const tools = [
            new tools_1.AddVWORulesTool(),
            new tools_1.ListProjectAndEnvironmentsTool(),
            new tools_1.ListFeatureFlagsTool(),
            new tools_1.CreateFeatureFlagTool(),
            new tools_1.CreateFeatureFlagWithDefaultsTool(),
            new tools_1.GetFeatureFlagTool(),
            new tools_1.UpdateFeatureFlagTool(),
            new tools_1.DeleteFeatureFlagTool(),
            new tools_1.CreateFeatureFlagRulesTool(),
            new tools_1.ListFeatureFlagRulesTool(),
            new tools_1.GetFeatureFlagRuleTool(),
            new tools_1.ToggleFeatureFlagRulesTool(),
            new tools_1.UpdateFeatureFlagRuleTool(),
            new tools_1.ToggleFeatureFlagTool(),
            new tools_1.DeleteFeatureFlagRuleTool(),
            new tools_1.GetMetricsTool(),
            new tools_1.FindStaleFeatureFlagsTool(),
            new tools_1.IntegrateSDKTool(),
        ];
        tools.forEach((tool) => {
            this.registerTool(tool);
        });
    }
    registerTool(tool) {
        this.server.tool(tool.name, tool.description, tool.inputSchema, tool.execute.bind(tool));
    }
    async connect(transport) {
        await this.server.connect(transport);
        console.error(`${this.config.name} MCP Server running on stdio`);
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.connect(transport);
    }
}
exports.VWOMCPServer = VWOMCPServer;
//# sourceMappingURL=server.js.map