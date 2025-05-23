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

import { FEATURE_FLAG_TYPES } from '../constants';
import { z } from 'zod';

export const CreateFeatureFlagRolloutAndPersonalizeRuleSchema = {
  environmentIdOrKey: z.string(),
  featureIdOrKey: z.string(),
  key: z.string(),
  name: z.string(),
  type: z
    .enum([FEATURE_FLAG_TYPES.FLAG_ROLLOUT, FEATURE_FLAG_TYPES.FLAG_PERSONALIZE])
    .default(FEATURE_FLAG_TYPES.FLAG_ROLLOUT),
  campaignData: z.object({
    percentSplit: z
      .number()
      .default(100)
      .describe('The percentage of the traffic for the rollout or personalize rule'),
    variations: z
      .array(
        z.object({
          featureVariationId: z
            .number()
            .describe('The feature variation id to be used for the personalize rule only'),
        }),
      )
      .optional()
      .describe('The variations to be used for the personalize rule only'),
  }),
};

export const CreateFeatureFlagTestingAndMultivariateRuleSchema = {
  environmentIdOrKey: z.string(),
  featureIdOrKey: z.string(),
  key: z.string(),
  name: z.string(),
  type: z
    .enum([FEATURE_FLAG_TYPES.FLAG_TESTING, FEATURE_FLAG_TYPES.FLAG_MULTIVARIATE])
    .default(FEATURE_FLAG_TYPES.FLAG_TESTING),
  campaignData: z.object({
    percentSplit: z
      .number()
      .default(100)
      .describe('The percentage of the traffic to allocate to testing or multivariate rule'),
    variations: z.array(
      z.object({
        percentSplit: z
          .number()
          .default(50)
          .describe('The percentage of the traffic to allocate to this variation'),
        featureVariationId: z.number(),
      }),
    ),
  }),
};
