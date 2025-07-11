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

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();

import { VWOConfig } from './config/index';
import { URL } from './constants';

import { VWORestAPI } from './services/VWORestAPI';
import {
  AddVWORulesTool,
  CreateFeatureFlagTool,
  DeleteFeatureFlagTool,
  UpdateFeatureFlagTool,
  GetFeatureFlagTool,
  ListFeatureFlagsTool,
  ListFeatureFlagRulesTool,
  CreateFeatureFlagRulesTool,
  GetFeatureFlagRuleTool,
  ToggleFeatureFlagRulesTool,
  ToggleFeatureFlagTool,
  DeleteFeatureFlagRuleTool,
  UpdateFeatureFlagRuleTool,
  ListProjectAndEnvironmentsTool,
  GetMetricsTool,
  CreateFeatureFlagWithDefaultsTool,
  FindStaleFeatureFlagsTool,
  IntegrateSDKTool,
} from './tools';

export class VWOMCPServer {
  public config: {
    name: string;
    version: string;
  };
  private server: McpServer;
  private api: any;
  private tools: Map<string, any>;

  constructor(config: any) {
    this.server = new McpServer(
      {
        name: config.name,
        version: config.version,
      },
      {
        capabilities: {
          resources: {}, // Enable resources
        },
      },
    );

    this.config = {
      name: config.name,
      version: config.version,
    };

    this.api = new VWORestAPI({
      baseURL: URL.VWO_API,
      apiKey: VWOConfig.apiKey,
      accountId: VWOConfig.accountId,
    });

    this.tools = new Map();
    this.registerTools();
  }

  private registerTools() {
    const tools = [
      new AddVWORulesTool(),

      new ListProjectAndEnvironmentsTool(),

      new ListFeatureFlagsTool(),
      new CreateFeatureFlagTool(),
      new CreateFeatureFlagWithDefaultsTool(),
      new GetFeatureFlagTool(),
      new UpdateFeatureFlagTool(),
      new DeleteFeatureFlagTool(),

      new CreateFeatureFlagRulesTool(),
      new ListFeatureFlagRulesTool(),
      new GetFeatureFlagRuleTool(),
      new ToggleFeatureFlagRulesTool(),
      new UpdateFeatureFlagRuleTool(),
      new ToggleFeatureFlagTool(),
      new DeleteFeatureFlagRuleTool(),

      new GetMetricsTool(),
      new FindStaleFeatureFlagsTool(),
      new IntegrateSDKTool(),
    ];

    tools.forEach((tool) => {
      this.registerTool(tool);
    });
  }

  public registerTool(tool: any): void {
    this.server.tool(tool.name, tool.description, tool.inputSchema, tool.execute.bind(tool));
  }

  public async connect(transport: any): Promise<void> {
    await this.server.connect(transport);
    console.error(`${this.config.name} MCP Server running on stdio`);
  }

  public async start() {
    const transport = new StdioServerTransport();
    await this.connect(transport);
  }
}
