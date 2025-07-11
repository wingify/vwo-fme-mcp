# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-07-08

### Added

- Added `CreateFeatureFlagWithDefaults` tool for creating complete feature flags with variations, rules, and automatic enablement in one step.
- Added support to find stale feature flags in codebase using `FindStaleFeatureFlags` tool.
- SDK integration can now work without cursor rule files using `IntegrateVWOSDK` tool.
- Extended `AddVWORules` tool to support both Cursor IDE and VS Code rule generation.

## [1.0.0] - 2025-06-06

### Added

- First release of MCP Server for VWO Feature Management and Experimentation
- For more details, please check out the [README.md](https://github.com/wingify/vwo-fme-mcp/blob/master/README.md)
