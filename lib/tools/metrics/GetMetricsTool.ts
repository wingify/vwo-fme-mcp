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
import { formatGenericResponse } from '../../utils/ResponseMessages';

export class GetMetricsTool extends BaseTool {
  constructor() {
    const name = 'GetMetrics';
    const description =
      'Get the complete list of all available data360 metrics that can be used across the entire VWO account (not specific feature flag data)';
    const inputSchema = GetMetricsSchema;

    super(name, description, inputSchema);
  }

  /**
   * Get all available metrics
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: { sdk: string }): Promise<any> {
    const result = await VWORestAPI.Instance.getMetrics();

    const response = formatGenericResponse(
      `Metrics fetched successfully. Result: ${JSON.stringify(result, null, 2)}`,
      args.sdk,
      true,
    );
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
