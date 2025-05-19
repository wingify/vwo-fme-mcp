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
import { UpdateFeatureFlagSchema } from '../../schema/UpdateFeatureFlagSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
import { IGoals, IVariable, IVariations } from '../../interfaces/FeatureFlagInterfaces';

export class UpdateFeatureFlagTool extends BaseTool {
  constructor() {
    const name = 'UpdateFeatureFlag';
    const description = 'Update a feature flag';
    const inputSchema = UpdateFeatureFlagSchema;

    super(name, description, inputSchema);
  }

  /**
   * Update a feature flag
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: {
    featureIdOrKey: string | number;
    name?: string;
    description?: string;
    goals?: IGoals[];
    variables?: IVariable[];
    variations?: IVariations[];
  }): Promise<any> {
    console.error('Updating feature flag', args);
    const result = await VWORestAPI.Instance.updateFeatureFlag(
      args.featureIdOrKey,
      args.name,
      args.description,
      args.goals,
      args.variables,
      args.variations,
    );
    console.error('Feature flag updated', result);
    return {
      content: [
        {
          type: 'text',
          text: `Feature flag "${args.featureIdOrKey}" updated successfully. Result: ${JSON.stringify(result)}`,
        },
      ],
    };
  }
}
