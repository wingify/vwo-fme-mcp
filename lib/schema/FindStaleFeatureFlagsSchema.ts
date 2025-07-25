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

import { z } from 'zod';
import { SUPPORTED_FILE_EXTENSIONS } from '../constants';

export const FindStaleFeatureFlagsSchema = {
  sourceFolder: z
    .string()
    .describe(
      'Prompt the user to provide the path to the source folder to scan. The path should not be a relative path',
    ),
  fileExtension: z
    .enum(Object.values(SUPPORTED_FILE_EXTENSIONS) as [string, ...string[]])
    .describe(
      'Prompt the user to select the file extension from the list of supported file extensions before proceeding.',
    ),
  repoName: z
    .string()
    .describe(
      'Prompt the user to provide the name of the current repository. It is required before proceeding.',
    ),
  repoBranch: z
    .string()
    .describe(
      'Prompt the user to provide the name of the current branch. It is required before proceeding.',
    ),
};
