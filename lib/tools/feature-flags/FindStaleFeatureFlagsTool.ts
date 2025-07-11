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
import { VWORestAPI } from '../../services/VWORestAPI';
import { FindStaleFeatureFlagsSchema } from '../../schema/FindStaleFeatureFlagsSchema';
import { formatTechDebtResponse } from '../../utils/ResponseMessages';

export class FindStaleFeatureFlagsTool extends BaseTool {
  constructor() {
    const name = 'FindStaleFeatureFlags';
    const description = 'Find unused or stale VWO FME feature flags in the codebase';
    const inputSchema = FindStaleFeatureFlagsSchema;
    super(name, description, inputSchema);
  }

  async execute(args: {
    sourceFolder: string;
    fileExtension: string;
    repoName: string;
    repoBranch: string;
  }): Promise<any> {
    const { sourceFolder, fileExtension, repoName, repoBranch } = args;

    const featureFlags = await VWORestAPI.Instance.getStaleFeatureFlags(
      sourceFolder,
      fileExtension,
      repoName,
      repoBranch,
    );

    const response = formatTechDebtResponse(featureFlags);
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
