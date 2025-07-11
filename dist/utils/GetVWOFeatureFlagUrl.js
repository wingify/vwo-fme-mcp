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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVWOFeatureFLagUrl = getVWOFeatureFLagUrl;
exports.getProjectUrl = getProjectUrl;
exports.getTechDebtUrl = getTechDebtUrl;
const constants_1 = require("../constants");
const VWOConfig_1 = require("../config/VWOConfig");
/**
 * Generates the URL for a feature flag in the VWO app
 * @param featureId - The ID of the feature flag
 * @returns The URL for the feature flag
 */
function getVWOFeatureFLagUrl(featureId) {
    return `${constants_1.URL.VWO_APP}/#/full-stack/feature-flag/${featureId}/edit/variables/?accountId=${VWOConfig_1.VWOConfig.accountId}`;
}
function getProjectUrl(projectId) {
    return `${constants_1.URL.VWO_APP}/#/websites-and-apps/connected/full-stack/${projectId}/sdk/?accountId=${VWOConfig_1.VWOConfig.accountId}`;
}
function getTechDebtUrl() {
    return `${constants_1.URL.VWO_APP}/#/full-stack-tech-debt?accountId=${VWOConfig_1.VWOConfig.accountId}`;
}
//# sourceMappingURL=GetVWOFeatureFlagUrl.js.map