# @mexl/backstage-plugin-mcp-frontend

🎨 **Backstage MCP Frontend plugin** for MCP (Model Context Protocol) entities in Backstage - enabling organizations to centrally manage, discover and share MCP servers across teams. Streamline MCP adoption, improve collaboration, and maintain governance through a unified interface for your organization's MCP infrastructure.

[![NPM Version](https://img.shields.io/npm/v/@mexl/backstage-plugin-mcp-frontend)](https://www.npmjs.com/package/@mexl/backstage-plugin-mcp-frontend)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

> **⚠️ Prerequisites**: This plugin requires the backend plugin [@mexl/backstage-plugin-catalog-backend-module-mcp](https://www.npmjs.com/package/@mexl/backstage-plugin-catalog-backend-module-mcp) to be installed first.

<div align="center">
  <img src="docs/screenshots/mcp-import-entity.png" alt="MCP Import" width="800"/>
  <p><em>Import new MCP entitiy interface</em></p>

  <img src="docs/screenshots/mcp-overview-cards.png" alt="MCP Kind" width="800"/>
  <p><em>Showing MCP kind in catalog</em></p>

  <img src="docs/screenshots/mcp-overview-entity.png" alt="MCP Entity List" width="800"/>
  <p><em>Browse and manage your MCP entities backstage view</em></p>

  <img src="docs/screenshots/mcp-overview-page.png" alt="MCP Overview Page" width="800"/>
  <p><em>Comprehensive MCP entity overview with interactive components</em></p>
</div>


## ✨ Features

<img src="docs/screenshots/vscode-integration.png" alt="VSCode Integration" width="800"/>
Open and edit MCP server configurations directly in VSCode.

## 🚀 Quick Setup

### Prerequisites

1. **Install Backend Plugin First**:
   ```bash
   yarn --cwd packages/backend add @mexl/backstage-plugin-catalog-backend-module-mcp
   ```
   
   See [backend setup guide](https://www.npmjs.com/package/@mexl/backstage-plugin-catalog-backend-module-mcp) for complete instructions.

### Step 1: Install Frontend Plugin

```bash
# Install the frontend plugin
yarn --cwd packages/app add @mexl/backstage-plugin-mcp-frontend
```

### Step 2: Add to EntityPage

In `packages/app/src/components/catalog/EntityPage.tsx`:

```typescript
// Add this import
import { MCPEntityPage } from '@mexl/backstage-plugin-mcp-frontend';

// Add to your existing entityPage switch (isKind should already be imported)
export const entityPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isKind('component')} children={componentPage} />
    <EntitySwitch.Case if={isKind('api')} children={apiPage} />
    {/* Add this line */}
    <EntitySwitch.Case if={isKind('MCP')} children={<MCPEntityPage />} />
    
    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);
```

### Step 3: Restart Backstage

```bash
yarn start
```

![Setup Complete](docs/screenshots/setup-complete.png)
*MCP entities now display with enhanced UI cards*

## 🎯 Usage

### Complete Setup Example

🌟 **New!** Try our [complete setup example](examples/complete-setup/) that includes a full organizational catalog with systems, components, users, groups, and MCP entities working together:

```bash
# Import the complete example
cp examples/complete-setup/catalog-info.yaml catalog-info/complete-example.yaml
```

This demonstrates:
- **Real-world integration** patterns with existing Backstage entities
- **System relationships** showing how MCP servers fit into your architecture  
- **Enhanced UI features** with rich descriptions and interactive components
- **Multiple transport types** (stdio, HTTP, SSE) and configurations

### Adding Individual MCP Entities

To add specific MCP entities to your catalog:

1. Choose from our [example configurations](examples/)
2. Copy to your catalog directory
3. Import through Backstage UI or configuration

### Using Individual Components

For custom entity pages, import components individually:

```typescript
import {
  MCPOverviewCard,
  MCPCapabilitiesCard,
  MCPConfigurationCard,
  MCPClientConfigCard,
} from '@mexl/backstage-plugin-mcp-frontend';

// Use in your custom layouts
<Grid container spacing={3}>
  <Grid item md={6}>
    <MCPOverviewCard />
  </Grid>
  <Grid item md={6}>
    <MCPCapabilitiesCard />
  </Grid>
</Grid>
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch  
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

Apache-2.0

## 🔗 Related Packages

- **Backend**: [@mexl/backstage-plugin-catalog-backend-module-mcp](https://www.npmjs.com/package/@mexl/backstage-plugin-catalog-backend-module-mcp)
- **Backstage**: [backstage.io](https://backstage.io/)
- **MCP Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io/)

---

**Made with ❤️ for the Backstage community**