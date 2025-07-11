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
exports.ResponseMessageType = void 0;
exports.formatMessage = formatMessage;
exports.formatReadyToUseFeatureFlagCreationResponse = formatReadyToUseFeatureFlagCreationResponse;
exports.formatFeatureFlagCreationResponse = formatFeatureFlagCreationResponse;
exports.formatFeatureFlagGetResponse = formatFeatureFlagGetResponse;
exports.formatFeatureFlagListResponse = formatFeatureFlagListResponse;
exports.formatFeatureFlagUpdateResponse = formatFeatureFlagUpdateResponse;
exports.formatTechDebtResponse = formatTechDebtResponse;
exports.formatProjectsAndEnvironmentsResponse = formatProjectsAndEnvironmentsResponse;
exports.formatGenericResponse = formatGenericResponse;
const GetVWOFeatureFlagUrl_1 = require("./GetVWOFeatureFlagUrl");
const GetDocumentationData_1 = require("./GetDocumentationData");
const GetVWOFeatureFlagUrl_2 = require("./GetVWOFeatureFlagUrl");
var ResponseMessageType;
(function (ResponseMessageType) {
    ResponseMessageType["READY_TO_USE_FEATURE_FLAG_CREATED"] = "READY_TO_USE_FEATURE_FLAG_CREATED";
    ResponseMessageType["FEATURE_FLAG_CREATED"] = "FEATURE_FLAG_CREATED";
    ResponseMessageType["FEATURE_FLAG_FETCHED"] = "FEATURE_FLAG_FETCHED";
    ResponseMessageType["FEATURE_FLAGS_LISTED"] = "FEATURE_FLAGS_LISTED";
    ResponseMessageType["FEATURE_FLAG_UPDATED"] = "FEATURE_FLAG_UPDATED";
    ResponseMessageType["TECH_DEBT"] = "TECH_DEBT";
    ResponseMessageType["PROJECTS_AND_ENVIRONMENTS_FETCHED"] = "PROJECTS_AND_ENVIRONMENTS_FETCHED";
    ResponseMessageType["GENERIC_RESPONSE"] = "GENERIC_RESPONSE";
})(ResponseMessageType || (exports.ResponseMessageType = ResponseMessageType = {}));
const MESSAGE_TEMPLATES = {
    [ResponseMessageType.READY_TO_USE_FEATURE_FLAG_CREATED]: {
        template: `Display the following text to the user:
    The feature flag \`"{key}"\` has been successfully created in VWO for the environment \`"{environmentIdOrKey}"\`. Here's what you can do next:

    🔗 **Access it in the VWO Dashboard**: [Click here to view your feature flag in the VWO Dashboard]({linkToFeatureFlag})

    📚 **Need More Information?**
    Check out the full VWO documentation here: [VWO Documentation]({sdkDocumentationLink})
    `,
        requiredParams: ['key', 'environmentIdOrKey', 'linkToFeatureFlag', 'sdkDocumentationLink'],
    },
    [ResponseMessageType.FEATURE_FLAG_CREATED]: {
        template: `Display the following text to the user:
    The feature flag \`"{key}"\` has been successfully created in VWO. Here's what you can do next:

    🔗 **Access it in the VWO Dashboard**: [Click here to view your feature flag in the VWO Dashboard]({linkToFeatureFlag})

    📚 **Need More Information?**
    Check out the full VWO documentation here: [VWO Documentation]({sdkDocumentationLink})
    `,
        requiredParams: ['key', 'linkToFeatureFlag', 'sdkDocumentationLink'],
    },
    [ResponseMessageType.FEATURE_FLAG_FETCHED]: {
        template: `Feature flag "{featureIdOrKey}" has been successfully fetched. Result: {responseData}.
    Display the following text to the user:
    The feature flag \`"{featureIdOrKey}"\` has been successfully fetched.
    🔗 **Access it in the VWO Dashboard**: [Click here to view your feature flag in the VWO Dashboard]
    ({linkToFeatureFlag})

    Display the feature flag details properly to the user.

    Always display the following text after displaying the feature flag details to the user:
    📚 **Need More Information?**
    Check out the full VWO documentation here: [VWO Documentation]({sdkDocumentationLink})
    `,
        requiredParams: ['featureIdOrKey', 'responseData', 'linkToFeatureFlag', 'sdkDocumentationLink'],
    },
    [ResponseMessageType.FEATURE_FLAGS_LISTED]: {
        template: `Feature flags have been successfully fetched. Result: {responseData}.
    While displaying the feature flags, display the link to the feature flag in the VWO Dashboard for each feature flag.
    The links to the feature flags are:
    {featureFlagLinks}

    Always display the following text at the end:
    📚 **Need More Information?**
    Check out the full VWO documentation here: [VWO Documentation]({sdkDocumentationLink})
    `,
        requiredParams: ['responseData', 'featureFlagLinks', 'sdkDocumentationLink'],
    },
    [ResponseMessageType.FEATURE_FLAG_UPDATED]: {
        template: `Feature flag "{featureIdOrKey}" has been successfully updated. Result: {responseData}.
    Display the following text to the user:
    The feature flag \`"{featureIdOrKey}"\` has been successfully updated.
    🔗 **Access it in the VWO Dashboard**: [Click here to view your feature flag in the VWO Dashboard]({linkToFeatureFlag})

    Always display the following text at the end:
    📚 **Need More Information?**
    Check out the full VWO documentation here: [VWO Documentation]({sdkDocumentationLink})
    `,
        requiredParams: ['featureIdOrKey', 'responseData', 'linkToFeatureFlag', 'sdkDocumentationLink'],
    },
    [ResponseMessageType.TECH_DEBT]: {
        template: `Stale Feature Flags: {responseData}.
    Display the recommendation properly to the user with File and Line Number highlighted.

    Also provide the VWO Dashboard link like this:
    [View Full-Stack Tech Debt in VWO]({techDebtUrl})
    
    Automatically remove the flags from the codebase
    `,
        requiredParams: ['responseData', 'techDebtUrl'],
    },
    [ResponseMessageType.PROJECTS_AND_ENVIRONMENTS_FETCHED]: {
        template: `Projects and environments have been successfully fetched. Result: {responseData}.
    Display the following text to the user:
    🔗 **Access it in the VWO Dashboard**: [Click here to view your projects and environments in the VWO Dashboard]({linkToProjectsAndEnvironments})
    
    Display the projects and environments details properly to the user.
    `,
        requiredParams: ['responseData', 'linkToProjectsAndEnvironments'],
    },
    [ResponseMessageType.GENERIC_RESPONSE]: {
        template: `{message}
    Always display the following text at the end:
    📚 **Need More Information?**
    Check out the full VWO documentation here: [VWO Documentation]({sdkDocumentationLink})
    `,
        requiredParams: ['message', 'sdkDocumentationLink'],
    },
};
function formatMessage(messageType, values) {
    const template = MESSAGE_TEMPLATES[messageType];
    // Validate required parameters
    const missingParams = template.requiredParams.filter((param) => !(param in values));
    if (missingParams.length > 0) {
        throw new Error(`Missing required parameters: ${missingParams.join(', ')}`);
    }
    let message = template.template;
    // Replace all parameters in the template
    for (const [key, value] of Object.entries(values)) {
        message = message.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    return message;
}
function formatReadyToUseFeatureFlagCreationResponse(key, environmentIdOrKey, response, sdk) {
    const linkToFeatureFlag = (0, GetVWOFeatureFlagUrl_1.getVWOFeatureFLagUrl)(response === null || response === void 0 ? void 0 : response.id);
    const sdkDocumentationLink = (0, GetDocumentationData_1.fetchGetFlagDocumentationLink)(sdk);
    return formatMessage(ResponseMessageType.READY_TO_USE_FEATURE_FLAG_CREATED, {
        key,
        environmentIdOrKey,
        linkToFeatureFlag,
        sdkDocumentationLink,
    });
}
function formatFeatureFlagCreationResponse(key, response, sdk) {
    const linkToFeatureFlag = (0, GetVWOFeatureFlagUrl_1.getVWOFeatureFLagUrl)(response === null || response === void 0 ? void 0 : response.id);
    const sdkDocumentationLink = (0, GetDocumentationData_1.fetchGetFlagDocumentationLink)(sdk);
    return formatMessage(ResponseMessageType.FEATURE_FLAG_CREATED, {
        key,
        linkToFeatureFlag,
        sdkDocumentationLink,
    });
}
function formatFeatureFlagGetResponse(featureIdOrKey, response, sdk) {
    const linkToFeatureFlag = (0, GetVWOFeatureFlagUrl_1.getVWOFeatureFLagUrl)(response === null || response === void 0 ? void 0 : response.id);
    const sdkDocumentationLink = (0, GetDocumentationData_1.fetchGetFlagDocumentationLink)(sdk);
    return formatMessage(ResponseMessageType.FEATURE_FLAG_FETCHED, {
        featureIdOrKey,
        responseData: JSON.stringify(response, null, 2),
        linkToFeatureFlag,
        sdkDocumentationLink,
    });
}
function formatFeatureFlagListResponse(response, sdk) {
    const sdkDocumentationLink = (0, GetDocumentationData_1.fetchGetFlagDocumentationLink)(sdk);
    let featureFlagLinks = [];
    if (Array.isArray(response)) {
        response.forEach((feature) => {
            const link = (0, GetVWOFeatureFlagUrl_1.getVWOFeatureFLagUrl)(feature.id);
            featureFlagLinks.push(link);
        });
    }
    return formatMessage(ResponseMessageType.FEATURE_FLAGS_LISTED, {
        responseData: JSON.stringify(response, null, 2),
        featureFlagLinks: featureFlagLinks.join('\n'),
        sdkDocumentationLink,
    });
}
function formatFeatureFlagUpdateResponse(featureIdOrKey, response, sdk) {
    const linkToFeatureFlag = (0, GetVWOFeatureFlagUrl_1.getVWOFeatureFLagUrl)(response === null || response === void 0 ? void 0 : response.id);
    const sdkDocumentationLink = (0, GetDocumentationData_1.fetchGetFlagDocumentationLink)(sdk);
    return formatMessage(ResponseMessageType.FEATURE_FLAG_UPDATED, {
        featureIdOrKey,
        responseData: JSON.stringify(response, null, 2),
        linkToFeatureFlag,
        sdkDocumentationLink,
    });
}
function formatTechDebtResponse(response) {
    const techDebtUrl = (0, GetVWOFeatureFlagUrl_2.getTechDebtUrl)();
    return formatMessage(ResponseMessageType.TECH_DEBT, {
        responseData: JSON.stringify(response, null, 2),
        techDebtUrl,
    });
}
function formatProjectsAndEnvironmentsResponse(response) {
    let projectLinks = [];
    if (Array.isArray(response)) {
        response.forEach((project) => {
            projectLinks.push((0, GetVWOFeatureFlagUrl_1.getProjectUrl)(project.id));
        });
    }
    return formatMessage(ResponseMessageType.PROJECTS_AND_ENVIRONMENTS_FETCHED, {
        responseData: JSON.stringify(response, null, 2),
        linkToProjectsAndEnvironments: projectLinks.join('\n'),
    });
}
function formatGenericResponse(message, sdk, isMetrics = false) {
    const sdkDocumentationLink = isMetrics
        ? (0, GetDocumentationData_1.fetchMetricsDocumentationLink)(sdk)
        : (0, GetDocumentationData_1.fetchGetFlagDocumentationLink)(sdk);
    return formatMessage(ResponseMessageType.GENERIC_RESPONSE, {
        message,
        sdkDocumentationLink,
    });
}
//# sourceMappingURL=ResponseMessages.js.map