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
import { ListFeatureFlagRulesSchema } from '../../schema/ListFeatureFlagRulesSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';

export class ListFeatureFlagRulesTool extends BaseTool {
  constructor() {
    const name = 'ListFeatureFlagRulesTool';
    const description = 'List all feature flag rules per environment';
    const inputSchema = ListFeatureFlagRulesSchema;

    super(name, description, inputSchema);
  }

  /**
   * List all feature flag rules per environment
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: {
    environmentIdOrKey: string;
    featureIdOrKey: string;
    limit?: number;
    offset?: number;
  }): Promise<any> {
    console.error('Getting a feature flag', args);
    const result = await VWORestAPI.Instance.getFeatureFlagRules(
      args.environmentIdOrKey,
      args.featureIdOrKey,
      args.limit,
      args.offset,
    );
    console.error('Feature flag', result);
    return {
      content: [
        {
          type: 'text',
          text: `FME Projects and associated Environments fetched successfully. Result: ${JSON.stringify(result)}`,
        },
      ],
    };
  }
}
