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

import axios, { AxiosInstance } from 'axios';
import { IGoals, IVariable, IVariations, IFeatureRules } from '../interfaces/FeatureFlagInterfaces';
import {
  scanCodebaseForFeatureFlags,
  enrichRecommendationsWithReferences,
} from '../utils/TechDebtUtil';

export interface IVWORestAPI {
  config: any;

  createFeatureFlag(
    key: string,
    name: string,
    description: string,
    featureType: string,
    goals?: IGoals[],
    variables?: IVariable[],
  ): Promise<any>;
  getFeatureFlag(key: string): Promise<any>;
  listFeatureFlags(limit: number, offset: number): Promise<any>;
  updateFeatureFlag(
    id: number,
    name: string,
    description: string,
    goals: IGoals[],
    variables: IVariable[],
  ): Promise<any>;
  deleteFeatureFlag(key: string): Promise<any>;
}

export class VWORestAPI implements IVWORestAPI {
  private static instance: VWORestAPI; // Singleton instance of VWORestAPI
  private api?: AxiosInstance;
  config: any;

  constructor(config: any) {
    this.config = config;

    if (config.isAlwaysNewInstance || !VWORestAPI.instance) {
      VWORestAPI.instance = this;

      // TODO: Remove cookie after testing
      this.api = axios.create({
        baseURL: config.baseURL,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-vwo-mcp-request': 'true',
          token: `${config.apiKey}`,
        },
      });
    }

    return VWORestAPI.instance;
  }

  /**
   * Provides access to the singleton instance of VWORestAPI.
   * @returns {VWORestAPI} The singleton instance.
   */
  static get Instance(): VWORestAPI {
    return VWORestAPI.instance;
  }

  /**
   * Creates a new feature flag.
   * @param key - The key of the feature flag.
   * @param name - The name of the feature flag.
   * @param description - The description of the feature flag.
   * @param featureType - The type of the feature flag.
   * @param goals - The goals of the feature flag.
   * @param variables - The variables of the feature flag.
   * @returns The response from the API.
   */
  async createFeatureFlag(
    key: string,
    name: string = key,
    description: string = '',
    featureType: string = 'TEMPORARY',
    goals: IGoals[] = [],
    variables: IVariable[] = [],
  ): Promise<any> {
    try {
      const payload: any = {
        name,
        featureKey: key,
        description,
        featureType,
      };

      if (goals.length > 0) {
        payload.goals = goals;
      }

      if (variables.length > 0) {
        payload.variables = variables;
      }

      const uri = `/${this.config.accountId}/features`;
      console.error(uri, payload);
      const response = await this.api?.post(uri, payload);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return `Error creating feature flag: ${errorMessage}`;
    }
  }

  /**
   * Gets a feature flag by its ID or key.
   * @param featureIdOrKey - The ID or key of the feature flag.
   * @returns The response from the API.
   */
  async getFeatureFlag(featureIdOrKey: string | number): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
      console.error(uri);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return `Error getting feature flag: ${errorMessage}`;
    }
  }

  /**
   * Lists all feature flags.
   * @param limit - The limit of the feature flags.
   * @param offset - The offset of the feature flags.
   * @returns The response from the API.
   */
  async listFeatureFlags(limit: number = 10, offset: number = 0): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/features/?limit=${limit}&offset=${offset}`;
      console.error(`URI: ${uri}`);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return `Error getting feature flags: ${errorMessage}`;
    }
  }
  /**
   * Updates a feature flag by its ID or key.
   * @param featureIdOrKey - The ID or key of the feature flag.
   * @param name - The name of the feature flag.
   * @param description - The description of the feature flag.
   * @param goals - The goals of the feature flag.
   * @param variables - The variables of the feature flag.
   * @param variations - The variations of the feature flag.
   * @returns The response from the API.
   */
  async updateFeatureFlag(
    featureIdOrKey: string | number,
    name?: string,
    description?: string,
    goals?: IGoals[],
    variables?: IVariable[],
    variations?: IVariations[],
  ): Promise<any> {
    try {
      let payload: any = {};

      if (name) {
        payload.name = name;
      }
      if (description) {
        payload.description = description;
      }
      if (goals && goals.length > 0) {
        payload.goals = goals;
      }
      if (variables && variables.length > 0) {
        payload.variables = variables;
      }
      if (variations && variations.length > 0) {
        payload.variations = variations;
      }

      const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
      console.error(uri, payload);
      const response = await this.api?.patch(uri, payload);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return `Error updating feature flag: ${errorMessage}`;
    }
  }

  /**
   * Deletes a feature flag by its ID or key.
   * @param featureIdOrKey - The ID or key of the feature flag.
   * @returns The response from the API.
   */
  async deleteFeatureFlag(featureIdOrKey: string | number): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
      console.error(uri);
      const response = await this.api?.delete(uri);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return `Error deleting feature flag: ${errorMessage}`;
    }
  }

  /**
   * Gets all projects and environments.
   * @param limit - The limit of the projects and environments.
   * @param offset - The offset of the projects and environments.
   * @returns The response from the API.
   */
  async getProjectsAndEnvironments(): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/projects`;
      console.error(uri);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;

      return `Error getting projects and environments: ${errorMessage}`;
    }
  }

  /**
   * Gets all feature flag rules.
   * @param environmentIdOrKey - The ID or key of the environment.
   * @param featureIdOrKey - The ID or key of the feature.
   * @param limit - The limit of the feature flag rules.
   * @param offset - The offset of the feature flag rules.
   * @returns The response from the API.
   */
  async getFeatureFlagRules(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules?limit=${limit}&offset=${offset}`;
      console.error(uri);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return `Error getting feature flag rules: ${errorMessage}`;
    }
  }

  /**
   * Creates single or multiple feature flag rules.
   * @param environmentIdOrKey - The ID or key of the environment.
   * @param featureIdOrKey - The ID or key of the feature.
   * @param rules - The rules of the feature flag.
   * @returns The response from the API.
   */
  async createMultipleFeatureFlagRules(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    rules: IFeatureRules,
  ): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules`;
      console.error(uri, rules);
      const response = await this.api?.post(uri, rules);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error('hey i got this error message');
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return errorMessage;
    }
  }

  /**
   * Gets a feature flag rule by its ID or key.
   * @param environmentIdOrKey - The ID or key of the environment.
   * @param featureIdOrKey - The ID or key of the feature.
   * @param ruleId - The ID or key of the rule.
   * @returns The response from the API.
   */
  async getFeatureFlagRule(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    ruleId: string,
  ): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleId}`;
      console.error(uri);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return `Error getting feature flag rule: ${errorMessage}`;
    }
  }

  /**
   * Toggles single, multiple or all feature flag rules.
   * @param environmentIdOrKey - The ID or key of the environment.
   * @param featureIdOrKey - The ID or key of the feature.
   * @param ruleIds - The IDs or keys of the rules. If not provided, toggle all rules.
   * @returns The response from the API.
   */
  async toggleMultipleFeatureFlagRules(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    isEnabled: boolean,
    ruleIds?: number[],
  ): Promise<any> {
    try {
      const payload: any = {
        isEnabled,
      };

      if (ruleIds && ruleIds.length > 0) {
        payload.ruleIds = ruleIds;
      }

      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/toggle`;
      console.error(uri);
      const response = await this.api?.patch(uri, payload);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return errorMessage;
    }
  }

  /**
   * Updates a feature flag rule by its ID or key.
   * @param environmentIdOrKey - The ID or key of the environment.
   * @param featureIdOrKey - The ID or key of the feature.
   * @param ruleIdOrKey - The ID or key of the rule.
   * @param campaignData - The campaign data of the rule.
   * @returns The response from the API.
   */
  async updateFeatureFlagRule(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    ruleIdOrKey: string,
    campaignData: any,
  ): Promise<any> {
    try {
      const payload: any = {
        campaignData: campaignData,
      };
      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleIdOrKey}`;
      console.error(uri, payload);
      const response = await this.api?.patch(uri, payload);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return errorMessage;
    }
  }

  /**
   * Toggles a feature flag for a specific environment.
   * @param environmentIdOrKey - The ID or key of the environment.
   * @param featureIdOrKey - The ID or key of the feature.
   * @param isEnabled - The state of the feature flag.
   * @returns The response from the API.
   */
  async toggleFeatureFlag(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    isEnabled: boolean,
  ): Promise<any> {
    try {
      const payload: any = {
        isEnabled,
      };
      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/toggle`;
      console.error(uri);
      const response = await this.api?.patch(uri, payload);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return errorMessage;
    }
  }

  /**
   * Deletes a feature flag rule by its ID or key.
   * @param environmentIdOrKey - The ID or key of the environment.
   * @param featureIdOrKey - The ID or key of the feature.
   * @param ruleIdOrKey - The ID or key of the rule.
   * @returns The response from the API.
   */
  async deleteFeatureFlagRule(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    ruleIdOrKey: string,
  ): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleIdOrKey}`;
      console.error(uri);
      const response = await this.api?.delete(uri);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return errorMessage;
    }
  }

  /**
   * Gets all metrics.
   * @param campaignType - The type of the campaign.
   * @returns The response from the API.
   */
  async getMetrics(): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/metrics?campaignType=flag-testing`;
      console.error(uri);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data?._data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return errorMessage;
    }
  }

  /**
   * Gets stale feature flags.
   * @param sourceFolder - The source folder of the codebase.
   * @param fileExtension - The file extension of the codebase.
   * @param repoName - The name of the repository.
   * @param repoBranch - The branch of the repository.
   * @returns The response from the API.
   */
  async getStaleFeatureFlags(
    sourceFolder: string,
    fileExtension: string,
    repoName: string,
    repoBranch: string,
  ): Promise<any> {
    try {
      const detectedFlags = await scanCodebaseForFeatureFlags(sourceFolder, fileExtension);

      const techDebtUri = `/${this.config.accountId}/features/tech-debt`;
      const techDebtPayload = {
        accountId: this.config.accountId,
        repoName,
        repoBranch,
        detectedFlags: JSON.stringify(detectedFlags, null, 2),
      };

      const techDebtResponse = await this.api?.post(techDebtUri, techDebtPayload);
      let recommendation = techDebtResponse?.data?._data?.flags;
      const recommendationsWithReferences = enrichRecommendationsWithReferences(
        recommendation,
        detectedFlags,
      );

      return recommendationsWithReferences;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return errorMessage;
    }
  }
}
