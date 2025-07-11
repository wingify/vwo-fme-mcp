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

import { FEATURE_FLAG_TYPES, SUPPORTED_SDK } from '../constants';
import { z } from 'zod';

export const ruleSchema = z
  .object({
    name: z.string().describe('Name of the rule'),
    key: z.string().describe('Unique key of the rule'),
    type: z
      .enum([
        FEATURE_FLAG_TYPES.FLAG_ROLLOUT,
        FEATURE_FLAG_TYPES.FLAG_TESTING,
        FEATURE_FLAG_TYPES.FLAG_MULTIVARIATE,
        FEATURE_FLAG_TYPES.FLAG_PERSONALIZE,
      ])
      .describe(
        'FLAG_ROLLOUT is used to rollout the feature flag to a percentage of the users. FLAG_TESTING is used to test the feature flag with a percentage of the users. FLAG_MULTIVARIATE is used to test the feature flag with multiple variations. FLAG_PERSONALIZE is used to personalize the feature flag using single variation.',
      ),
    campaignData: z.object({
      percentSplit: z
        .number()
        .default(100)
        .describe(
          'Traffic for the rule. If not provided, 100% traffic will be allocated to the rule.',
        ),
      variations: z
        .array(
          z.object({
            percentSplit: z.number().default(50).describe('Traffic to allocate to this variation.'),
            featureVariationId: z.number().describe('ID of the variation'),
          }),
        )
        .optional(),
    }),
  })
  .describe(
    'For Rollout rule, only percentSplit is required. For Testing rule, variations are required and variations array must have at least 2 objects having featureVariationId and percentSplit. For Personalize rule, variations are required and must have exactly 1 object having featureVariationId and percentSplit.\
    Each rule has its individual traffic allocation. If not provided, 100% traffic will be allocated to each rule. Incase of Testing rule, the traffic will be split between the variations. If not provided, 50% traffic will be allocated to each variation.',
  );

export const featureRuleSchema = z.object({
  rules: z.array(ruleSchema).min(1, { message: 'At least one rule is required' }),
});

export const CreateFeatureFlagRulesSchema = {
  environmentIdOrKey: z
    .string()
    .describe('Prompt the user to select the environment id or key from the list of environments.'),
  featureIdOrKey: z
    .string()
    .describe('Prompt the user to select the feature id or key from the list of features.'),
  sdk: z
    .enum(Object.values(SUPPORTED_SDK) as [string, ...string[]])
    .describe('Check the SDK using the file extension and select the SDK accordingly.'),
  featureRule: featureRuleSchema.describe(
    'Feature rule to be created for the feature flag. If not provided, create one rollout and one testing rule.',
  ),
};
