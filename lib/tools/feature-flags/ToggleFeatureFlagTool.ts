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

import { ToggleFeatureFlagSchema } from '../../schema/ToggleFeatureFlagSchema';
import { BaseTool } from '../BaseTool';
import { VWORestAPI } from '../../services/VWORestAPI';
import { formatGenericResponse } from '../../utils/ResponseMessages';

export class ToggleFeatureFlagTool extends BaseTool {
  constructor() {
    const name = 'ToggleFeatureFlag';
    const description = 'Toggle a feature flag';
    const inputSchema = ToggleFeatureFlagSchema;

    super(name, description, inputSchema);
  }

  /**
   * Toggle a feature flag
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: {
    environmentIdOrKey: string;
    featureIdOrKey: string;
    isEnabled: boolean;
    sdk: string;
  }): Promise<any> {
    const result = await VWORestAPI.Instance.toggleFeatureFlag(
      args.environmentIdOrKey,
      args.featureIdOrKey,
      args.isEnabled,
    );
    const response = formatGenericResponse(
      `Feature flag "${args.featureIdOrKey}" toggled successfully. Result: ${JSON.stringify(result, null, 2)}`,
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
