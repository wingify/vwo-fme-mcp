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
import { DeleteFeatureFlagRuleSchema } from '../../schema/DeleteFeatureFlagRuleSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
export class DeleteFeatureFlagRuleTool extends BaseTool {
  constructor() {
    const name = 'DeleteFeatureFlagRule';
    const description = 'Delete a feature flag rule';
    const inputSchema = DeleteFeatureFlagRuleSchema;

    super(name, description, inputSchema);
  }

  /**
   * Delete a feature flag rule
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: {
    environmentIdOrKey: string;
    featureIdOrKey: string;
    ruleIdOrKey: string;
  }): Promise<any> {
    const result = await VWORestAPI.Instance.deleteFeatureFlagRule(
      args.environmentIdOrKey,
      args.featureIdOrKey,
      args.ruleIdOrKey,
    );
    return {
      content: [
        {
          type: 'text',
          text: `Feature flag rule "${args.ruleIdOrKey}" deleted successfully. Result: ${JSON.stringify(result, null, 2)}`,
        },
      ],
    };
  }
}
