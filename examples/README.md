# MCP Server Examples

This directory contains comprehensive examples of MCP (Model Context Protocol) server configurations for Backstage. These examples demonstrate different complexity levels and use cases to help you implement MCP entities in your organization.

## 📁 Example Files

### `simple-examples.yaml`
**Perfect for getting started** - Basic MCP configurations with minimal setup:
- File operations MCP (stdio transport)
- Weather API MCP (HTTP transport) 
- Database query MCP (stdio transport)

### `medium-examples.yaml`
**For production deployments** - More advanced configurations with authentication:
- GitHub integration MCP with OAuth2
- Multi-database analytics MCP with complex environment setup
- Slack integration MCP with WebSocket real-time events

### `complex-examples.yaml`
**Enterprise-grade implementations** - Advanced configurations for large organizations:
- ML/AI pipeline orchestration MCP with SSE transport
- Multi-cloud infrastructure management MCP
- Document AI processing MCP with GPU resources

## 🚀 How to Use These Examples

### 1. Choose Your Starting Point
```bash
# For beginners - start with simple examples
cp examples/simple-examples.yaml catalog-info/

# For production use - try medium examples  
cp examples/medium-examples.yaml catalog-info/

# For enterprise deployment - explore complex examples
cp examples/complex-examples.yaml catalog-info/
```

### 2. Customize for Your Environment
- Replace `company.com` with your domain
- Update team names (`platform-team`, `data-team`, etc.)
- Configure authentication providers
- Adjust timeouts and resource limits
- Set environment variables for your setup

### 3. Add to Your Catalog
Update your `app-config.yaml`:
```yaml
catalog:
  locations:
    - type: file
      target: ../../catalog-info/simple-examples.yaml
      rules:
        - allow: [MCP]
```

### 4. Import and Verify
1. Restart Backstage: `yarn dev`
2. Navigate to Catalog → All
3. Filter by Kind: "MCP"
4. Verify your MCP entities appear

## 🔧 Configuration Tips

### Environment Variables
- Use `valueFrom: "secret"` for sensitive data
- Group related environment variables together
- Document required vs optional variables

### Authentication
- `oauth2`: For enterprise SSO integration
- `api-key`: For simple API authentication  
- `bearer`: For token-based auth
- `basic`: For username/password auth

### Transport Methods
- `stdio`: Local process communication (fastest)
- `http`: Remote HTTP APIs (most common)
- `websocket`: Real-time bidirectional communication
- `sse`: Server-sent events for streaming

### Dependencies
- Use `dependsOn` to model infrastructure dependencies
- Use `consumedBy` to show which components use this MCP
- Link to existing Backstage entities (APIs, Components, Systems)


## 🤝 Contributing Examples

Have a great MCP configuration to share? Please contribute:

1. Follow the existing naming conventions
2. Add helpful comments for configuration options
3. Use realistic but anonymized data
4. Test the configuration works in Backstage
5. Submit a pull request with your example

---

**Need help?** Check the [troubleshooting guide](../README.md) or open an issue on GitHub.