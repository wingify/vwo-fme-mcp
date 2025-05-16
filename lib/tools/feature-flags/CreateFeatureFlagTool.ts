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
import { CreateFeatureFlagSchema } from '../../schema/CreateFeatureFlagSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
import { IGoals, IVariable } from '../../interfaces/FeatureFlagInterfaces';
export class CreateFeatureFlagTool extends BaseTool {
  constructor() {
    const name = 'CreateFeatureFlag';
    const description = 'Create a new feature flag';
    const inputSchema = CreateFeatureFlagSchema;

    super(name, description, inputSchema);
  }

  /**
   * Create a new feature flag
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: {
    featureKey: string;
    name?: string;
    description?: string;
    featureType?: string;
    goals?: IGoals[];
    variables?: IVariable[];
  }): Promise<any> {
    console.error('Creating feature flag', args);
    const result = await VWORestAPI.Instance.createFeatureFlag(
      args.featureKey,
      args.name,
      args.description,
      args.featureType,
      args.goals,
      args.variables,
    );
    console.error('Feature flag created', result);
    return {
      content: [
        {
          type: 'text',
          text: `Feature flag "${args.featureKey}" created successfully. Result: ${JSON.stringify(result)}`,
        },
      ],
    };
  }
}
