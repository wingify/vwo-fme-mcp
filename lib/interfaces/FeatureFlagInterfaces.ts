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

export interface IVariation {
  percentSplit: number;
  featureVariationId: number;
}

export interface IGoals {
  metricName: string;
}

export interface IVariable {
  variableName: string;
  dataType: string;
  defaultValue: boolean | string | number | object;
}

export interface IVariations {
  name: string;
  key: string;
  variables: IVariable[];
}

export interface IFeatureRuleCampaignData {
  percentSplit: number;
  variations?: IVariation[];
}

export interface IFeatureRules {
  rules: IRule[];
}

export interface IRule {
  name: string;
  key: string;
  type: string;
  campaignData: IFeatureRuleCampaignData;
}
