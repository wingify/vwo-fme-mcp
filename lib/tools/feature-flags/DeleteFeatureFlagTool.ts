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
import { DeleteFeatureFlagSchema } from '../../schema/DeleteFeatureFlagSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
export class DeleteFeatureFlagTool extends BaseTool {
  constructor() {
    const name = 'DeleteFeatureFlag';
    const description = 'Delete a feature flag';
    const inputSchema = DeleteFeatureFlagSchema;

    super(name, description, inputSchema);
  }

  /**
   * Delete a feature flag
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: { featureIdOrKey: string | number }): Promise<any> {
    console.error('Deleting feature flag', args);
    const result = await VWORestAPI.Instance.deleteFeatureFlag(args.featureIdOrKey);
    console.error('Feature flag deleted', result);
    return {
      content: [
        {
          type: 'text',
          text: `Feature flag "${args.featureIdOrKey}" deleted successfully. Result: ${JSON.stringify(result)}`,
        },
      ],
    };
  }
}
