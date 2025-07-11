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
import { CreateFeatureFlagWithDefaultsSchema } from '../../schema/CreateFeatureFlagWithDefaultsSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
import {
  IVariations,
  IFeatureRules,
  IGoals,
  IVariable,
} from '../../interfaces/FeatureFlagInterfaces';
import { SUPPORTED_SDK } from '../../constants';
import { formatReadyToUseFeatureFlagCreationResponse } from '../../utils/ResponseMessages';

export class CreateFeatureFlagWithDefaultsTool extends BaseTool {
  constructor() {
    const name = 'CreateFeatureFlagWithDefaults';
    const description = 'Create a new ready-to-use feature flag with smart default values';
    const inputSchema = CreateFeatureFlagWithDefaultsSchema;

    super(name, description, inputSchema);
  }

  /**
   * Create a new feature flag
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: {
    featureKey: string;
    environmentIdOrKey: string;
    sdk: keyof typeof SUPPORTED_SDK;
    name?: string;
    description?: string;
    featureType?: string;
    goals?: IGoals[];
    variables?: IVariable[];
    variations?: IVariations[];
    featureRule: IFeatureRules;
  }): Promise<any> {
    const createBasicFeatureFlagResult = await VWORestAPI.Instance.createFeatureFlag(
      args.featureKey,
      args.name,
      args.description,
      args.featureType,
      args.goals,
      args.variables,
    );
    const updateFeatureFlagResult = await VWORestAPI.Instance.updateFeatureFlag(
      args.featureKey,
      undefined,
      undefined,
      undefined,
      undefined,
      args.variations,
    );
    const createFeatureRuleResult = await VWORestAPI.Instance.createMultipleFeatureFlagRules(
      args.environmentIdOrKey,
      args.featureKey,
      args.featureRule,
    );

    let ruleIds: any[] = [];
    if (Array.isArray(createFeatureRuleResult?._data)) {
      ruleIds = createFeatureRuleResult._data.map((item: any) => {
        if (item.id) {
          return item.id;
        }
      });
    }

    // 4. Enable all feature flag rules
    const enableFeatureFlagRulesResult = await VWORestAPI.Instance.toggleMultipleFeatureFlagRules(
      args.environmentIdOrKey,
      args.featureKey,
      true,
      ruleIds,
    );

    const enableFeatureFlagResult = await VWORestAPI.Instance.toggleFeatureFlag(
      args.environmentIdOrKey,
      args.featureKey,
      true,
    );

    const response = formatReadyToUseFeatureFlagCreationResponse(
      args.featureKey,
      args.environmentIdOrKey,
      createBasicFeatureFlagResult,
      args.sdk,
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
