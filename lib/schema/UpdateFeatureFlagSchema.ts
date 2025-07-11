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
import { SUPPORTED_SDK } from '../constants';

export const UpdateFeatureFlagSchema = {
  featureIdOrKey: z.string(),
  name: z.string().optional(),
  sdk: z
    .enum(Object.values(SUPPORTED_SDK) as [string, ...string[]])
    .describe('Check the SDK using the file extension and select the SDK accordingly.'),
  description: z.string().optional(),
  goals: z
    .array(
      z.object({
        metricName: z.string(),
      }),
    )
    .optional(),
  variables: z
    .array(
      z.object({
        id: z
          .number()
          .describe(
            'ID of the variable. It is required only when user want to update the default variable value of the feature flag.',
          )
          .optional(),
        variableName: z.string(),
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
    .optional(),
  variations: z
    .array(
      z
        .object({
          id: z
            .number()
            .describe(
              'ID of the variation. It is required only when user want to update the variation of the feature flag.',
            )
            .optional(),
          name: z
            .string()
            .describe(
              'variation name should be self explanatory according to the feature key and usercase',
            ),
          key: z.string(),
          variables: z.array(
            z.object({
              variableId: z.number(),
              value: z
                .boolean()
                .or(z.string())
                .or(z.number())
                .or(
                  z
                    .object({})
                    .describe('for Json data type, object should be stringified')
                    .passthrough(),
                ),
            }),
          ),
        })
        .describe('New variations of the feature flag excluding default key.'),
    )
    .optional(),
};
