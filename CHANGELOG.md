# Changelog

## [1.1.0] - 2025-07-31

### ✨ New Features
- **JSON/Text Toggle**: Switch between human-readable and raw JSON views in Capabilities and Configuration cards
- **Syntax Highlighting**: Beautiful JSON formatting with GitHub-style colors (dark/light theme aware)
- **VSCode Integration**: One-click "Add to VSCode" button using VSCode Insiders redirect
- **Client Configuration Card**: Ready-to-use client configurations for VSCode extensions and generic MCP clients
- **Enhanced UI**: Improved card layouts, better spacing, and professional styling

### 🎨 Enhanced Components
- **MCPCapabilitiesCard**: Added JSON view toggle, syntax highlighting, and rich descriptions support
- **MCPConfigurationCard**: Added JSON view toggle and improved configuration display
- **MCPOverviewCard**: Better theme support and refined quick start command display
- **MCPClientConfigCard**: New component with VSCode/Generic tabs and copy functionality

### 🔧 Technical Improvements
- **Theme Awareness**: Full dark/light theme support across all components
- **Copy to Clipboard**: Easy configuration copying with success notifications
- **Responsive Design**: Improved mobile and desktop layouts
- **TypeScript**: Better type safety and declarations

### 🚀 Integration Features
- **VSCode Extensions**: Compatible with Cline, Continue.dev, and other MCP extensions
- **Environment Variables**: Smart handling of secrets and configuration values
- **Multiple Client Support**: VSCode and generic MCP client configuration formats

### 🐛 Bug Fixes
- Fixed import paths for standalone plugin usage
- Improved error handling for clipboard operations
- Better fallback behavior for VSCode integration

## [1.0.0] - 2024-XX-XX

### Initial Release
- Basic MCP entity visualization components
- MCPOverviewCard, MCPCapabilitiesCard, MCPConfigurationCard
- Entity page layout and routing