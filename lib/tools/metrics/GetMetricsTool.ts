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

import { BaseTool } from '../BaseTool';
import { GetMetricsSchema } from '../../schema/GetMetricsSchema';
import { VWORestAPI } from '../../services/VWORestAPI';

export class GetMetricsTool extends BaseTool {
  constructor() {
    const name = 'GetMetrics';
    const description = 'Get All available metrics';
    const inputSchema = GetMetricsSchema;

    super(name, description, inputSchema);
  }

  /**
   * Get all available metrics
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: { campaignType: string }): Promise<any> {
    console.error('Getting metrics', args);
    const result = await VWORestAPI.Instance.getMetrics(args.campaignType);
    console.error('Metrics', result);
    return {
      content: [
        {
          type: 'text',
          text: `Metrics fetched successfully. Result: ${JSON.stringify(result)}`,
        },
      ],
    };
  }
}
