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

import { CreateFeatureFlagTestingAndMultivariateRuleSchema } from '../../schema/CreateFeatureFlagRulesSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
import { IVariation } from '../../interfaces/FeatureFlagInterfaces';

export interface ICampaignData {
  percentSplit: number;
  variations: IVariation[];
}

export class CreateTestingAndMVTRuleTool extends BaseTool {
  constructor() {
    const name = 'CreateTestingAndMVTRule';
    const description = 'Create a new testing and multivariate rule';
    const inputSchema = CreateFeatureFlagTestingAndMultivariateRuleSchema;

    super(name, description, inputSchema);
  }

  /**
   * Create a new testing and multivariate rule
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: {
    environmentIdOrKey: string;
    featureIdOrKey: string;
    key: string;
    name: string;
    type: string;
    campaignData: ICampaignData;
  }): Promise<any> {
    console.error('Creating testing and multivariate rule', args);
    const result = await VWORestAPI.Instance.createFeatureFlagRule(
      args.environmentIdOrKey,
      args.featureIdOrKey,
      args.key,
      args.name,
      args.type,
      args.campaignData,
    );
    console.error('Testing and multivariate rule created', result);
    return {
      content: [
        {
          type: 'text',
          text: `Testing and multivariate rule "${args.key}" created successfully. Result: ${JSON.stringify(result)}`,
        },
      ],
    };
  }
}
