"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VWORestAPI = void 0;
const axios_1 = __importDefault(require("axios"));
class VWORestAPI {
    constructor(config) {
        this.config = config;
        if (config.isAlwaysNewInstance || !VWORestAPI.instance) {
            VWORestAPI.instance = this;
            this.api = axios_1.default.create({
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
    static get Instance() {
        return VWORestAPI.instance;
    }
    async createFeatureFlag(key, name = key, description = '', featureType = 'TEMPORARY', goals = [], variables = []) {
        var _a, _b;
        try {
            const payload = {
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
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.post(uri, payload));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async getFeatureFlag(featureIdOrKey) {
        var _a, _b;
        try {
            const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async listFeatureFlags(limit = 10, offset = 0) {
        var _a, _b;
        try {
            const uri = `/${this.config.accountId}/features/?limit=${limit}&offset=${offset}`;
            console.error(`URI: ${uri}`);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async updateFeatureFlag(featureIdOrKey, name, description, goals, variables, variations) {
        var _a, _b;
        try {
            let payload = {};
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
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.patch(uri, payload));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async deleteFeatureFlag(featureIdOrKey) {
        var _a, _b;
        try {
            const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.delete(uri));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async getProjectsAndEnvironments(limit = 10, offset = 0) {
        var _a, _b;
        try {
            const uri = `/${this.config.accountId}/projects`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async getFeatureFlagRules(environmentIdOrKey, featureIdOrKey, limit = 10, offset = 0) {
        var _a, _b;
        try {
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules?limit=${limit}&offset=${offset}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async createFeatureFlagRule(environmentIdOrKey, featureIdOrKey, key, name, type, campaignData) {
        var _a, _b;
        try {
            const payload = {
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
            if ((campaignData === null || campaignData === void 0 ? void 0 : campaignData.length) > 0) {
                payload.campaignData = campaignData;
            }
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules`;
            console.error(uri, payload);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.post(uri, payload));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async getFeatureFlagRule(environmentIdOrKey, featureIdOrKey, ruleId) {
        var _a, _b;
        try {
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleId}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async toggleFeatureFlagRule(environmentIdOrKey, featureIdOrKey, ruleIdOrKey, isEnabled) {
        var _a, _b;
        try {
            const payload = {
                isEnabled,
            };
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleIdOrKey}/toggle`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.patch(uri, payload));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async toggleFeatureFlag(environmentIdOrKey, featureIdOrKey, isEnabled) {
        var _a, _b;
        try {
            const payload = {
                isEnabled,
            };
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/toggle`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.patch(uri, payload));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async deleteFeatureFlagRule(environmentIdOrKey, featureIdOrKey, ruleIdOrKey) {
        var _a, _b;
        try {
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleIdOrKey}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.delete(uri));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
    async getMetrics(campaignType) {
        var _a, _b;
        try {
            const uri = `/${this.config.accountId}/metrics?campaignType=${campaignType}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)
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
exports.VWORestAPI = VWORestAPI;
//# sourceMappingURL=VWORestAPI.js.map