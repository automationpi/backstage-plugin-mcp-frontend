import React from 'react';
import { Grid } from '@material-ui/core';
import {
  EntityLayout,
  EntityAboutCard,
  EntityDependsOnComponentsCard,
  EntityDependsOnResourcesCard,
  EntityHasComponentsCard,
  EntityLinksCard,
} from '@backstage/plugin-catalog';

import { MCPOverviewCard } from './cards/MCPOverviewCard';
import { MCPCapabilitiesCard } from './cards/MCPCapabilitiesCard';
import { MCPConfigurationCard } from './cards/MCPConfigurationCard';
import { MCPClientConfigCard } from './cards/MCPClientConfigCard';

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    <Grid item md={6} xs={12}>
      <MCPOverviewCard />
    </Grid>
    <Grid item md={6} xs={12}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    <Grid item md={6} xs={12}>
      <MCPCapabilitiesCard />
    </Grid>
    <Grid item md={6} xs={12}>
      <MCPConfigurationCard />
    </Grid>
    <Grid item md={6} xs={12}>
      <MCPClientConfigCard />
    </Grid>
    <Grid item md={6} xs={12}>
      <EntityLinksCard variant="gridItem" />
    </Grid>
  </Grid>
);

const dependenciesContent = (
  <Grid container spacing={3} alignItems="stretch">
    <Grid item md={6} xs={12}>
      <EntityDependsOnComponentsCard variant="gridItem" />
    </Grid>
    <Grid item md={6} xs={12}>
      <EntityDependsOnResourcesCard variant="gridItem" />
    </Grid>
    <Grid item md={6} xs={12}>
      <EntityHasComponentsCard variant="gridItem" />
    </Grid>
  </Grid>
);

export const MCPEntityPage = () => (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/dependencies" title="Dependencies">
      {dependenciesContent}
    </EntityLayout.Route>
  </EntityLayout>
);