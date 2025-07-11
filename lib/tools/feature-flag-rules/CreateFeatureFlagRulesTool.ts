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

import { CreateFeatureFlagRulesSchema } from '../../schema/CreateFeatureFlagRulesSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
import { IFeatureRules } from '../../interfaces/FeatureFlagInterfaces';
import { formatGenericResponse } from '../../utils/ResponseMessages';

export class CreateFeatureFlagRulesTool extends BaseTool {
  constructor() {
    const name = 'CreateFeatureFlagRules';
    const description = 'Create a single or multiple feature flag rules';
    const inputSchema = CreateFeatureFlagRulesSchema;

    super(name, description, inputSchema);
  }

  async execute(args: {
    featureIdOrKey: string;
    environmentIdOrKey: string;
    featureRule: IFeatureRules;
    sdk: string;
  }): Promise<any> {
    const createFeatureRuleResult = await VWORestAPI.Instance.createMultipleFeatureFlagRules(
      args.environmentIdOrKey,
      args.featureIdOrKey,
      args.featureRule,
    );

    const response = formatGenericResponse(
      `Feature rules created successfully. Result: ${JSON.stringify(createFeatureRuleResult, null, 2)}`,
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
