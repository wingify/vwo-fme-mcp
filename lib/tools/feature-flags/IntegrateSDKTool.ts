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

import { IntegrateSDKSchema } from '../../schema/IntegrateSDKSchema';
import { BaseTool } from '../BaseTool';
import { fetchFilteredSdkReadme } from '../../utils/GetDocumentationData';

export class IntegrateSDKTool extends BaseTool {
  constructor() {
    const name = 'IntegrateVWOSDK';
    const description = 'Integrate the VWO FME SDK code';
    const inputSchema = IntegrateSDKSchema;

    super(name, description, inputSchema);
  }

  /**
   * Integrate the SDK code
   * @param args - The arguments for the tool
   * @returns The result of the tool
   */
  async execute(args: { sdk: string }): Promise<any> {
    const { sdk } = args;

    const sdkReadme = await fetchFilteredSdkReadme(sdk);
    return {
      content: [
        {
          type: 'text',
          text: `Below is the documentation for the SDK. Please implement and correctly integrate the feature flag according to the documentation.
                ${sdkReadme}
                `,
        },
      ],
    };
  }
}
