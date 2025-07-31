import * as _backstage_core_plugin_api from '@backstage/core-plugin-api';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare const mcpPlugin: _backstage_core_plugin_api.BackstagePlugin<{
    root: _backstage_core_plugin_api.RouteRef<undefined>;
}, {}, {}>;

declare const MCPEntityPage: () => react_jsx_runtime.JSX.Element;

declare const MCPOverviewCard: () => react_jsx_runtime.JSX.Element;

declare const MCPCapabilitiesCard: () => react_jsx_runtime.JSX.Element;

declare const MCPConfigurationCard: () => react_jsx_runtime.JSX.Element;

declare const MCPClientConfigCard: () => react_jsx_runtime.JSX.Element;

export { MCPCapabilitiesCard, MCPClientConfigCard, MCPConfigurationCard, MCPEntityPage, MCPOverviewCard, mcpPlugin };
