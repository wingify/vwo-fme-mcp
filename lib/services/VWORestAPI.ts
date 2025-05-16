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
import { IGoals, IVariable, IVariations } from '../interfaces/FeatureFlagInterfaces';

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

      this.api = axios.create({
        baseURL: config.baseURL,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
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
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error getting feature flag: ${errorMessage}`,
          },
        ],
      };
    }
  }

  async getFeatureFlag(featureIdOrKey: string | number): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
      console.error(uri);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error getting feature flag: ${errorMessage}`,
          },
        ],
      };
    }
  }

  async listFeatureFlags(limit: number = 10, offset: number = 0): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/features/?limit=${limit}&offset=${offset}`;
      console.error(`URI: ${uri}`);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error getting feature flag: ${errorMessage}`,
          },
        ],
      };
    }
  }

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
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error getting feature flag: ${errorMessage}`,
          },
        ],
      };
    }
  }

  async deleteFeatureFlag(featureIdOrKey: string | number): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
      console.error(uri);
      const response = await this.api?.delete(uri);
      console.error(response);
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error getting feature flag: ${errorMessage}`,
          },
        ],
      };
    }
  }

  async getProjectsAndEnvironments(limit: number = 10, offset: number = 0): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/projects`;
      console.error(uri);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;

      return {
        content: [
          {
            type: 'text',
            text: `Error getting projects and environments: ${errorMessage}`,
          },
        ],
      };
    }
  }

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
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error getting feature flag rules: ${errorMessage}`,
          },
        ],
      };
    }
  }

  async createFeatureFlagRule(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    key: string,
    name: string,
    type: string,
    campaignData: any,
  ): Promise<any> {
    try {
      const payload: any = {
        name,
        key,
        type,
        campaignData,
      };

      if (name) {
        payload.name = name;
      }

      if (key) {
        payload.key = key;
      }

      if (type) {
        payload.type = type;
      }

      if (campaignData?.length > 0) {
        payload.campaignData = campaignData;
      }

      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules`;
      console.error(uri, payload);
      const response = await this.api?.post(uri, payload);
      console.error(response);
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error creating feature flag rule: ${errorMessage}`,
          },
        ],
      };
    }
  }

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
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error getting feature flag rule: ${errorMessage}`,
          },
        ],
      };
    }
  }

  async toggleFeatureFlagRule(
    environmentIdOrKey: string,
    featureIdOrKey: string,
    ruleIdOrKey: string,
    isEnabled: boolean,
  ): Promise<any> {
    try {
      const payload: any = {
        isEnabled,
      };
      const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleIdOrKey}/toggle`;
      console.error(uri);
      const response = await this.api?.patch(uri, payload);
      console.error(response);
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error toggling feature flag rule: ${errorMessage}`,
          },
        ],
      };
    }
  }

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
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error toggling feature flag: ${errorMessage}`,
          },
        ],
      };
    }
  }

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
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error deleting feature flag rule: ${errorMessage}`,
          },
        ],
      };
    }
  }

  async getMetrics(campaignType: string): Promise<any> {
    try {
      const uri = `/${this.config.accountId}/metrics?campaignType=${campaignType}`;
      console.error(uri);
      const response = await this.api?.get(uri);
      console.error(response);
      return response?.data;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return {
        content: [
          {
            type: 'text',
            text: `Error getting metrics: ${errorMessage}`,
          },
        ],
      };
    }
  }
}
