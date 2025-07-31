import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes.esm.js';

const mcpPlugin = createPlugin({
  id: "mcp",
  routes: {
    root: rootRouteRef
  }
});
mcpPlugin.provide(
  createRoutableExtension({
    name: "MCPEntityPage",
    component: () => import('./components/MCPEntityPage.esm.js').then((m) => m.MCPEntityPage),
    mountPoint: rootRouteRef
  })
);

export { mcpPlugin };
//# sourceMappingURL=plugin.esm.js.map
