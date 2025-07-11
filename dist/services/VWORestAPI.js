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
const TechDebtUtil_1 = require("../utils/TechDebtUtil");
class VWORestAPI {
    constructor(config) {
        this.config = config;
        if (config.isAlwaysNewInstance || !VWORestAPI.instance) {
            VWORestAPI.instance = this;
            // TODO: Remove cookie after testing
            this.api = axios_1.default.create({
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
    static get Instance() {
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
    async createFeatureFlag(key, name = key, description = '', featureType = 'TEMPORARY', goals = [], variables = []) {
        var _a, _b, _c;
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
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async getFeatureFlag(featureIdOrKey) {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async listFeatureFlags(limit = 10, offset = 0) {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/features/?limit=${limit}&offset=${offset}`;
            console.error(`URI: ${uri}`);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async updateFeatureFlag(featureIdOrKey, name, description, goals, variables, variations) {
        var _a, _b, _c;
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
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async deleteFeatureFlag(featureIdOrKey) {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/features/${featureIdOrKey}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.delete(uri));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async getProjectsAndEnvironments() {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/projects`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async getFeatureFlagRules(environmentIdOrKey, featureIdOrKey, limit = 10, offset = 0) {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules?limit=${limit}&offset=${offset}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async createMultipleFeatureFlagRules(environmentIdOrKey, featureIdOrKey, rules) {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules`;
            console.error(uri, rules);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.post(uri, rules));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error('hey i got this error message');
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async getFeatureFlagRule(environmentIdOrKey, featureIdOrKey, ruleId) {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleId}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async toggleMultipleFeatureFlagRules(environmentIdOrKey, featureIdOrKey, isEnabled, ruleIds) {
        var _a, _b, _c;
        try {
            const payload = {
                isEnabled,
            };
            if (ruleIds && ruleIds.length > 0) {
                payload.ruleIds = ruleIds;
            }
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/toggle`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.patch(uri, payload));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async updateFeatureFlagRule(environmentIdOrKey, featureIdOrKey, ruleIdOrKey, campaignData) {
        var _a, _b, _c;
        try {
            const payload = {
                campaignData: campaignData,
            };
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleIdOrKey}`;
            console.error(uri, payload);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.patch(uri, payload));
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async toggleFeatureFlag(environmentIdOrKey, featureIdOrKey, isEnabled) {
        var _a, _b, _c;
        try {
            const payload = {
                isEnabled,
            };
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/toggle`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.patch(uri, payload));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async deleteFeatureFlagRule(environmentIdOrKey, featureIdOrKey, ruleIdOrKey) {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/environments/${environmentIdOrKey}/features/${featureIdOrKey}/rules/${ruleIdOrKey}`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.delete(uri));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async getMetrics() {
        var _a, _b, _c;
        try {
            const uri = `/${this.config.accountId}/metrics?campaignType=flag-testing`;
            console.error(uri);
            const response = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.get(uri));
            console.error(response);
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b._data;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)
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
    async getStaleFeatureFlags(sourceFolder, fileExtension, repoName, repoBranch) {
        var _a, _b, _c, _d;
        try {
            const detectedFlags = await (0, TechDebtUtil_1.scanCodebaseForFeatureFlags)(sourceFolder, fileExtension);
            const techDebtUri = `/${this.config.accountId}/features/tech-debt`;
            const techDebtPayload = {
                accountId: this.config.accountId,
                repoName,
                repoBranch,
                detectedFlags: JSON.stringify(detectedFlags, null, 2),
            };
            const techDebtResponse = await ((_a = this.api) === null || _a === void 0 ? void 0 : _a.post(techDebtUri, techDebtPayload));
            let recommendation = (_c = (_b = techDebtResponse === null || techDebtResponse === void 0 ? void 0 : techDebtResponse.data) === null || _b === void 0 ? void 0 : _b._data) === null || _c === void 0 ? void 0 : _c.flags;
            const recommendationsWithReferences = (0, TechDebtUtil_1.enrichRecommendationsWithReferences)(recommendation, detectedFlags);
            return recommendationsWithReferences;
        }
        catch (error) {
            console.error(error);
            const errorMessage = ((_d = error.response) === null || _d === void 0 ? void 0 : _d.data)
                ? JSON.stringify(error.response.data)
                : error.message;
            return errorMessage;
        }
    }
}
exports.VWORestAPI = VWORestAPI;
//# sourceMappingURL=VWORestAPI.js.map