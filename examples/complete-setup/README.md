# Complete Backstage Setup with MCP Integration

This directory contains a comprehensive example showing how MCP entities integrate seamlessly into a complete Backstage organizational catalog. Import this example to see MCP servers working alongside your existing systems, components, APIs, and teams.

## 🏗️ What's Included

This complete setup demonstrates a realistic organizational structure:

### **👥 People & Teams**
- **Users**: John Doe (Platform Engineer), Jane Smith (Data Science Lead), Mike Wilson (Frontend Developer)
- **Groups**: Platform Team, Data Team, ML Platform Team, Frontend Team, Engineering Division
- **Ownership**: Clear team ownership and hierarchical structure

### **🏢 Systems & Architecture**
- **Developer Platform**: Internal tools and services for engineering teams
- **Data Platform**: Data processing and analytics infrastructure  
- **ML Platform**: Machine learning model training and deployment

### **🔌 APIs & Resources**
- **GitHub API**: Version control and repository management
- **Weather API**: External data source for analytics
- **PostgreSQL Cluster**: Primary database infrastructure
- **GPU Cluster**: Machine learning compute resources

### **🏗️ Components & Applications**
- **Developer Portal**: Backstage-based internal developer portal
- **Data Pipeline Orchestrator**: Manages ETL and data processing
- **ML Model Serving**: Production ML model inference service

### **🤖 MCP Servers** (The Stars of the Show!)
- **File Operations MCP**: Developer workflow automation
- **GitHub Integration MCP**: Repository and issue management
- **Weather Data MCP**: External data integration
- **Database Analytics MCP**: Advanced database operations
- **ML Model Management MCP**: MLOps and model lifecycle

## 🎯 Key Integration Patterns

### **System Relationships**
```
Developer Platform
├── File Operations MCP (stdio)
├── GitHub Integration MCP (HTTP)
└── Developer Portal Component

Data Platform  
├── Weather Data MCP (HTTP)
├── Database Analytics MCP (stdio)
└── Data Pipeline Orchestrator

ML Platform
├── ML Model Management MCP (SSE)
└── ML Model Serving Component
```

### **Dependency Modeling**
- MCP servers depend on APIs and resources (`dependsOn`)
- Components consume MCP capabilities (`consumedBy`)
- Clear ownership and system boundaries
- Realistic authentication and configuration

### **Transport & Runtime Diversity**
- **stdio**: Local process communication (File Ops, DB Analytics)
- **HTTP**: Remote API integration (GitHub, Weather)
- **SSE**: Real-time streaming (ML Model Management)
- **Node.js & Python**: Multiple runtime environments

## 🚀 Quick Start

### Import the Complete Setup

1. **Copy the catalog file**:
   ```bash
   cp examples/complete-setup/catalog-info.yaml catalog-info/complete-example.yaml
   ```

2. **Update your app-config.yaml**:
   ```yaml
   catalog:
     rules:
       - allow: [Component, System, API, Resource, Location, User, Group, MCP]
     locations:
       - type: file
         target: ../../catalog-info/complete-example.yaml
         rules:
           - allow: [Component, System, API, Resource, User, Group, MCP]
   ```

3. **Restart Backstage**:
   ```bash
   yarn dev
   ```

### Explore the Integration

1. **Browse by Entity Type**:
   - **Systems**: See how MCP servers fit into larger system architecture
   - **Components**: Understand which components consume MCP capabilities  
   - **MCP Entities**: Experience enhanced MCP visualization with relationships

2. **Follow the Relationships**:
   - Click on a **System** → See all related MCP servers and components
   - Click on an **MCP Entity** → See which components consume it
   - Click on a **Component** → See which MCP servers it depends on

3. **Experience Enhanced MCP UI**:
   - Rich capability descriptions with tools, resources, and prompts
   - Interactive client configuration with VSCode integration
   - JSON/Text toggle for technical and business-friendly views
   - Visual relationship mapping to other catalog entities

## 🎨 Frontend Plugin Highlights

This complete example showcases the frontend plugin's enhanced features:

### **Contextual Integration**
- MCP entities show relationships to systems, components, and teams
- Clear ownership and lifecycle information
- System-level organization and discovery

### **Enhanced Visualization**
- **Overview Cards**: Status, runtime, transport with system context
- **Capabilities Cards**: Rich descriptions of tools, resources, prompts
- **Configuration Cards**: Environment setup with dependency links
- **Client Config Cards**: Ready-to-use configurations with VSCode integration

### **Relationship Navigation**
- Click dependencies to navigate to related APIs and resources
- See which components consume each MCP server
- Understand the broader system architecture context

## 📋 Customization Guide

### Replace Example Data

1. **Update Organization Info**:
   ```yaml
   # Replace with your teams
   - name: your-platform-team
   # Replace with your users  
   - name: your.engineer
   ```

2. **Configure Your Systems**:
   ```yaml
   # Update system definitions
   metadata:
     name: your-developer-platform
   spec:
     owner: your-platform-team
   ```

3. **Customize MCP Servers**:
   ```yaml
   # Update MCP configurations
   configuration:
     url: "https://your-mcp.company.com/api"
   authentication:
     provider: "your-sso-provider"
   ```

### Environment-Specific Setup

- **Development**: Use experimental lifecycle, local URLs
- **Staging**: Use production lifecycle, staging endpoints  
- **Production**: Use production lifecycle, secure authentication

## 🔍 Use Cases Demonstrated

### **Developer Platform Integration**
- File operations for project scaffolding
- GitHub automation for repository management
- Developer portal consuming MCP capabilities

### **Data Platform Integration**  
- External API integration for weather data
- Database analytics for business intelligence
- Data pipeline orchestration with MCP tools

### **ML Platform Integration**
- Model lifecycle management with MLOps
- Real-time model monitoring and deployment
- GPU resource management and scaling

## 🎓 Key Learnings

After importing this example, you'll understand:

1. **How MCP entities integrate** into existing Backstage catalogs
2. **Relationship modeling** between MCP servers and other entities
3. **System organization** and ownership patterns
4. **Enhanced UI capabilities** of the frontend plugin
5. **Real-world configuration** patterns and best practices

## 🔗 Next Steps

1. **Start with Simple**: Use individual MCP examples for learning
2. **Build Gradually**: Add one MCP server at a time to your catalog
3. **Model Relationships**: Connect MCP servers to your existing systems
4. **Enhance UI**: Install the frontend plugin for better visualization
5. **Customize**: Adapt the patterns to your organization's needs

---

**Transform your Backstage catalog** with powerful MCP integration and enhanced visualization!