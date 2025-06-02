"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFeatureFlagTool = void 0;
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
const CreateFeatureFlagSchema_1 = require("../../schema/CreateFeatureFlagSchema");
const BaseTool_1 = require("../BaseTool");
const VWORestAPI_1 = require("../../services/VWORestAPI");
class CreateFeatureFlagTool extends BaseTool_1.BaseTool {
    constructor() {
        const name = 'CreateFeatureFlag';
        const description = 'Create a new feature flag';
        const inputSchema = CreateFeatureFlagSchema_1.CreateFeatureFlagSchema;
        super(name, description, inputSchema);
    }
    /**
     * Create a new feature flag
     * @param args - The arguments for the tool
     * @returns The result of the tool
     */
    async execute(args) {
        console.error('Creating feature flag', args);
        const result = await VWORestAPI_1.VWORestAPI.Instance.createFeatureFlag(args.featureKey, args.name, args.description, args.featureType, args.goals, args.variables);
        console.error('Feature flag created', result);
        return {
            content: [
                {
                    type: 'text',
                    text: `Feature flag "${args.featureKey}" created successfully. Result: ${JSON.stringify(result)}`,
                },
            ],
        };
    }
}
exports.CreateFeatureFlagTool = CreateFeatureFlagTool;
//# sourceMappingURL=CreateFeatureFlagTool.js.map