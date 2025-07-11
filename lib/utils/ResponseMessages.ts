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

import { getProjectUrl, getVWOFeatureFLagUrl } from './GetVWOFeatureFlagUrl';
import {
  fetchGetFlagDocumentationLink,
  fetchMetricsDocumentationLink,
} from './GetDocumentationData';
import { getTechDebtUrl } from './GetVWOFeatureFlagUrl';

export enum ResponseMessageType {
  READY_TO_USE_FEATURE_FLAG_CREATED = 'READY_TO_USE_FEATURE_FLAG_CREATED',
  FEATURE_FLAG_CREATED = 'FEATURE_FLAG_CREATED',
  FEATURE_FLAG_FETCHED = 'FEATURE_FLAG_FETCHED',
  FEATURE_FLAGS_LISTED = 'FEATURE_FLAGS_LISTED',
  FEATURE_FLAG_UPDATED = 'FEATURE_FLAG_UPDATED',
  TECH_DEBT = 'TECH_DEBT',
  PROJECTS_AND_ENVIRONMENTS_FETCHED = 'PROJECTS_AND_ENVIRONMENTS_FETCHED',
  GENERIC_RESPONSE = 'GENERIC_RESPONSE',
}

interface MessageTemplate {
  template: string;
  requiredParams: string[];
}

const MESSAGE_TEMPLATES: Record<ResponseMessageType, MessageTemplate> = {
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

export function formatMessage(messageType: ResponseMessageType, values: Record<string, any>) {
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

export function formatReadyToUseFeatureFlagCreationResponse(
  key: string,
  environmentIdOrKey: string,
  response: any,
  sdk: string,
) {
  const linkToFeatureFlag = getVWOFeatureFLagUrl(response?.id);
  const sdkDocumentationLink = fetchGetFlagDocumentationLink(sdk);

  return formatMessage(ResponseMessageType.READY_TO_USE_FEATURE_FLAG_CREATED, {
    key,
    environmentIdOrKey,
    linkToFeatureFlag,
    sdkDocumentationLink,
  });
}

export function formatFeatureFlagCreationResponse(key: string, response: any, sdk: string) {
  const linkToFeatureFlag = getVWOFeatureFLagUrl(response?.id);
  const sdkDocumentationLink = fetchGetFlagDocumentationLink(sdk);

  return formatMessage(ResponseMessageType.FEATURE_FLAG_CREATED, {
    key,
    linkToFeatureFlag,
    sdkDocumentationLink,
  });
}

export function formatFeatureFlagGetResponse(
  featureIdOrKey: string | number,
  response: any,
  sdk: string,
) {
  const linkToFeatureFlag = getVWOFeatureFLagUrl(response?.id);
  const sdkDocumentationLink = fetchGetFlagDocumentationLink(sdk);

  return formatMessage(ResponseMessageType.FEATURE_FLAG_FETCHED, {
    featureIdOrKey,
    responseData: JSON.stringify(response, null, 2),
    linkToFeatureFlag,
    sdkDocumentationLink,
  });
}

export function formatFeatureFlagListResponse(response: any, sdk: string) {
  const sdkDocumentationLink = fetchGetFlagDocumentationLink(sdk);
  let featureFlagLinks: string[] = [];

  if (Array.isArray(response)) {
    response.forEach((feature) => {
      const link = getVWOFeatureFLagUrl(feature.id);
      featureFlagLinks.push(link);
    });
  }

  return formatMessage(ResponseMessageType.FEATURE_FLAGS_LISTED, {
    responseData: JSON.stringify(response, null, 2),
    featureFlagLinks: featureFlagLinks.join('\n'),
    sdkDocumentationLink,
  });
}

export function formatFeatureFlagUpdateResponse(
  featureIdOrKey: string | number,
  response: any,
  sdk: string,
) {
  const linkToFeatureFlag = getVWOFeatureFLagUrl(response?.id);
  const sdkDocumentationLink = fetchGetFlagDocumentationLink(sdk);

  return formatMessage(ResponseMessageType.FEATURE_FLAG_UPDATED, {
    featureIdOrKey,
    responseData: JSON.stringify(response, null, 2),
    linkToFeatureFlag,
    sdkDocumentationLink,
  });
}

export function formatTechDebtResponse(response: any) {
  const techDebtUrl = getTechDebtUrl();
  return formatMessage(ResponseMessageType.TECH_DEBT, {
    responseData: JSON.stringify(response, null, 2),
    techDebtUrl,
  });
}

export function formatProjectsAndEnvironmentsResponse(response: any) {
  let projectLinks: string[] = [];

  if (Array.isArray(response)) {
    response.forEach((project) => {
      projectLinks.push(getProjectUrl(project.id));
    });
  }

  return formatMessage(ResponseMessageType.PROJECTS_AND_ENVIRONMENTS_FETCHED, {
    responseData: JSON.stringify(response, null, 2),
    linkToProjectsAndEnvironments: projectLinks.join('\n'),
  });
}

export function formatGenericResponse(message: string, sdk: string, isMetrics: boolean = false) {
  const sdkDocumentationLink = isMetrics
    ? fetchMetricsDocumentationLink(sdk)
    : fetchGetFlagDocumentationLink(sdk);
  return formatMessage(ResponseMessageType.GENERIC_RESPONSE, {
    message,
    sdkDocumentationLink,
  });
}
