import { jsx, jsxs } from 'react/jsx-runtime';
import { Grid } from '@material-ui/core';
import { EntityLayout } from '@backstage/plugin-catalog';
import { MCPOverviewCard } from './cards/MCPOverviewCard.esm.js';
import { MCPCapabilitiesCard } from './cards/MCPCapabilitiesCard.esm.js';
import { MCPConfigurationCard } from './cards/MCPConfigurationCard.esm.js';
import { MCPClientConfigCard } from './cards/MCPClientConfigCard.esm.js';

const overviewContent = /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 3, alignItems: "stretch", children: [
  /* @__PURE__ */ jsx(Grid, { item: true, md: 6, xs: 12, children: /* @__PURE__ */ jsx(MCPOverviewCard, {}) }),
  /* @__PURE__ */ jsx(Grid, { item: true, md: 6, xs: 12, children: /* @__PURE__ */ jsx(MCPCapabilitiesCard, {}) }),
  /* @__PURE__ */ jsx(Grid, { item: true, md: 6, xs: 12, children: /* @__PURE__ */ jsx(MCPConfigurationCard, {}) }),
  /* @__PURE__ */ jsx(Grid, { item: true, md: 6, xs: 12, children: /* @__PURE__ */ jsx(MCPClientConfigCard, {}) })
] });
const MCPEntityPage = () => /* @__PURE__ */ jsx(EntityLayout, { children: /* @__PURE__ */ jsx(EntityLayout.Route, { path: "/", title: "Overview", children: overviewContent }) });

export { MCPEntityPage };
//# sourceMappingURL=MCPEntityPage.esm.js.map
