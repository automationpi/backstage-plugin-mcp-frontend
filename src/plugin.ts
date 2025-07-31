import {
  createPlugin,
  createRouteRef,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mcpPlugin = createPlugin({
  id: 'mcp',
  routes: {
    root: rootRouteRef,
  },
});

export const MCPEntityPage = mcpPlugin.provide(
  createRoutableExtension({
    name: 'MCPEntityPage',
    component: () =>
      import('./components/MCPEntityPage').then(m => m.MCPEntityPage),
    mountPoint: rootRouteRef,
  }),
);