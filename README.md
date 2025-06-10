# MCP Server for VWO Feature Management and Experimentation SDK

[![npm version](https://img.shields.io/npm/v/vwo-fme-mcp?style=for-the-badge&color=green&logo=npm)](https://www.npmjs.com/package/vwo-fme-mcp)
[![License](https://img.shields.io/github/license/wingify/vwo-fme-mcp?style=for-the-badge&color=blue)](http://www.apache.org/licenses/LICENSE-2.0)

## Overview

The VWO FME MCP is a tool that enables you to manage feature flags directly through your AI coding assistant. It integrates VWO's feature management system with AI development tools, allowing you to create, update, and control feature flags seamlessly within your coding environment.

### Key Features

- **Seamless AI Assistant Integration**: Compatible with Cursor, VS Code, and Claude
- **Comprehensive Feature Flag Management**: Easily create, view, list, update, and delete feature flags
- **Environment-Specific Controls**: Toggle features on or off across different environments
- **Cursor Rule Setup**: Bootstrapping simplifies the configuration of Cursor rules to deliver contextual results and integrate with the SDK

This tool helps developers save time by managing feature flags right where they code, without switching between different tools.

### Required Configuration

To use the MCP server, you need to configure two mandatory environment variables:

- `VWO_ACCOUNT_ID`: Your VWO Account ID.
- `VWO_API_KEY`: Your VWO API Key (Developers Token) for interacting with RESTful APIs

These credentials are required to authenticate and connect with the VWO feature management system.

## How to Connect the MCP Server to Your Client

You can use the VWO MCP server with any client that supports the MCP protocol. Below are step-by-step guides for popular tools. Be sure to replace `VWO_ACCOUNT_ID` with your actual VWO API key, and `VWO_API_KEY` with your VWO API URL.

### Cursor

1. Go to **Cursor Settings** and select the **MCP** section.
2. Click on **Add new global MCP server**.
3. When prompted, enter the following configuration (make sure to use your real credentials):

```json
{
  "mcpServers": {
    "vwo-fme": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp@latest"],
      "env": {
        "VWO_ACCOUNT_ID": "VWO_ACCOUNT_ID",
        "VWO_API_KEY": "VWO_API_KEY"
      }
    }
  }
}
```

<img src="./assets/gifs/VWO_Cursor_MCP .gif" />

4. Save your changes. If everything is set up correctly, you should see a green status indicator showing the server is active.

---

### VS Code

1. Open your **User Settings (JSON)** in VS Code.
2. Add or update the MCP server configuration as shown below:

```json
"mcp": {
  "servers": {
    "vwo-fme": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp@latest"],
      "env": {
        "VWO_ACCOUNT_ID": "VWO_ACCOUNT_ID",
        "VWO_API_KEY": "VWO_API_KEY"
      }
    }
  }
}
```

<img src="./assets/gifs/VWO_VS_Code_MCP.gif" />

3. Save the settings file. The MCP server should now be available in VS Code.

---

### Claude Desktop

1. Open the **Settings** menu and go to the **Developer** section.
2. Click **Edit Config** to open your `claude_desktop_config.json` file.
3. Add the following block to your configuration (replace the placeholders with your actual credentials):

```json
{
  "mcpServers": {
    "vwo-fme": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp@latest"],
      "env": {
        "VWO_ACCOUNT_ID": "VWO_ACCOUNT_ID",
        "VWO_API_KEY": "VWO_API_KEY"
      }
    }
  }
}
```

4. Save the file and restart Claude Desktop. Once connected, you should see a hammer icon in the chat window, confirming the MCP server is active.

<img src="./assets/gifs/VWO_Claude_MCP.gif" />

---

If you use a different client, refer to its documentation for how to add a custom MCP server. The configuration pattern will be similar to the examples above.

## Available Tools

Here's what you can do with our feature flag management tools:

### Cursor Bootstrapping with VWO

1. **Bootstrap VWO** - Retrieve cursor rules and configuration settings to seamlessly manage feature flags within your project. This enables smooth integration with your SDK and leverages VWO's feature management capabilities.

📝**Note**: Currently supported only in the Cursor IDE. Needs to be called once after setting up VWO FME MCP.

### Feature Flags

1. **Create Feature Flag** - Launch a new feature flag into your account with custom settings, metrics, and variables.

2. **Delete Feature Flag** - Safely remove any feature flag from your account when it's no longer needed.

3. **Get Feature Flag** - Dive into the details of any feature flag to see its current configuration and status.

4. **List Feature Flags** - Get a bird's-eye view of all your feature flags in one place.

5. **Update Feature Flag** - Fine-tune your feature flags by modifying their properties, metrics, and variations.

6. **Toggle Feature Flag** - Instantly enable or disable feature flags in different environments with a single click.

### Feature Flag Rules

1. **List Feature Flag Rules** - View all rules associated with your feature flags.

2. **Create Rollout and Personalize Rule** - Set up rules for gradual rollout or personalization of your features.

3. **Create Testing and MVT Rule** - Configure rules for A/B testing or multivariate testing.

4. **Get Feature Flag Rule** - Examine the details of a specific feature flag rule.

5. **Toggle Feature Flag Rule** - Enable or disable specific rules for your feature flags.

6. **Delete Feature Flag Rule** - Remove unwanted rules from your feature flags.

### Projects and Environments

1. **List Projects and Environments** - See all your projects and their associated environments.

### Metrics

1. **Get Metrics** - Access metrics for your feature flags and experiments.

## Requirements

- **Node.js v12 or later**

### Version History

The version history tracks changes, improvements, and bug fixes in each version. For a full history, see the [CHANGELOG.md](https://github.com/wingify/vwo-fme-mcp/blob/master/CHANGELOG.md).

## Development and Testing

### Install Dependencies and Bootstrap Git Hooks

```bash
npm install
# or
yarn install
```

### Compile TypeScript to JavaScript

```bash
npm run build
# or
yarn run build
```

## Contributing

We welcome contributions to improve this SDK! Please read our [contributing guidelines](https://github.com/wingify/vwo-fme-mcp/blob/master/CONTRIBUTING.md) before submitting a PR.

## Code of Conduct

Our [Code of Conduct](https://github.com/wingify/vwo-fme-mcp/blob/master/CODE_OF_CONDUCT.md) outlines expectations for all contributors and maintainers.

## License

[Apache License, Version 2.0](https://github.com/wingify/vwo-fme-mcp/blob/master/LICENSE)

Copyright 2025 Wingify Software Pvt. Ltd.
