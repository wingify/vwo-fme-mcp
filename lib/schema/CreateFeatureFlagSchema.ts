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

import { z } from 'zod';
import { FEATURE_FLAG_PERSISTENCE_TYPES, SUPPORTED_SDK } from '../constants';

export const CreateFeatureFlagSchema = {
  featureKey: z
    .string()
    .describe(
      "The key of the feature flag. Should only contain alphanumeric characters and underscores. Should be self explanatory according to the user's usercase.",
    ),
  name: z.string().optional(),
  description: z.string().optional(),
  sdk: z
    .enum(Object.values(SUPPORTED_SDK) as [string, ...string[]])
    .describe(
      'Check the language using the file extension and select the SDK from the list of supported SDKs. Prompt the user to confirm the SDK before proceeding.',
    ),
  featureType: z
    .enum([FEATURE_FLAG_PERSISTENCE_TYPES.TEMPORARY, FEATURE_FLAG_PERSISTENCE_TYPES.PERMANENT])
    .default(FEATURE_FLAG_PERSISTENCE_TYPES.TEMPORARY),
  goals: z
    .array(
      z.object({
        metricName: z.string().default('Default Metric MCP'),
      }),
    )
    .optional()
    .describe('Use default metric name if no information is provided by user related to metric.'),
  variables: z
    .array(
      z.object({
        variableName: z
          .string()
          .describe(
            'variable name should be self explanatory according to the feature key and usercase',
          ),
        dataType: z.enum(['boolean', 'string', 'int', 'float', 'json']),
        defaultValue: z
          .boolean()
          .or(z.string())
          .or(z.number())
          .or(
            z.object({}).describe('for Json data type, object should be stringified').passthrough(),
          ),
      }),
    )
    .describe('Variables are used to store the data for the feature flag'),
};
