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
import { ListFeatureFlagsSchema } from '../../schema/ListFeatureFlagsSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
import { formatFeatureFlagListResponse } from '../../utils/ResponseMessages';
export class ListFeatureFlagsTool extends BaseTool {
  constructor() {
    const name = 'ListFeatureFlags';
    const description = 'List all feature flags';
    const inputSchema = ListFeatureFlagsSchema;

    super(name, description, inputSchema);
  }

  /**
   * List all feature flags
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: { limit?: number; offset?: number; sdk: string }): Promise<any> {
    const result = await VWORestAPI.Instance.listFeatureFlags(args.limit, args.offset);
    const response = formatFeatureFlagListResponse(result, args.sdk);
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
