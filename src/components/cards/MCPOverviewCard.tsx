import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';
import {
  StatusOK,
  StatusWarning,
  StatusError,
} from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  quickStart: {
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[900],
    color: theme.palette.type === 'dark' ? theme.palette.text.primary : theme.palette.common.white,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    marginTop: theme.spacing(2),
  },
}));

const getLifecycleIcon = (lifecycle: string) => {
  switch (lifecycle) {
    case 'production':
      return <StatusOK />;
    case 'experimental':
      return <StatusWarning />;
    case 'deprecated':
      return <StatusError />;
    default:
      return <StatusWarning />;
  }
};

const getLifecycleColor = (lifecycle: string): 'primary' | 'default' | 'secondary' => {
  switch (lifecycle) {
    case 'production':
      return 'primary';
    case 'experimental':
      return 'default';
    case 'deprecated':
      return 'secondary';
    default:
      return 'default';
  }
};

export const MCPOverviewCard = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  
  if (!entity || entity.kind !== 'MCP') {
    return null;
  }

  const spec = entity.spec as any;
  const { transport, runtime, type, lifecycle, configuration } = spec;

  const quickStartCommand = configuration?.command && configuration?.args 
    ? `${configuration.command} ${configuration.args.join(' ')}`
    : 'Configuration details in Configuration tab';

  return (
    <Card className={classes.card}>
      <CardHeader title="🚀 MCP Overview" />
      <CardContent>
        <Box className={classes.statusContainer}>
          {getLifecycleIcon(lifecycle)}
          <Typography variant="body2">
            <strong>Status:</strong> {lifecycle || 'Unknown'}
          </Typography>
        </Box>

        <Typography variant="body2" gutterBottom>
          <strong>Type:</strong> {type}
        </Typography>
        
        <Typography variant="body2" gutterBottom>
          <strong>Runtime:</strong> {runtime}
        </Typography>
        
        <Typography variant="body2" gutterBottom>
          <strong>Transport:</strong> {transport}
        </Typography>

        <Box className={classes.chipContainer}>
          <Chip 
            label={lifecycle} 
            color={getLifecycleColor(lifecycle)}
            size="small" 
          />
          <Chip label={runtime} variant="outlined" size="small" />
          <Chip label={transport} variant="outlined" size="small" />
          <Chip label={type} variant="outlined" size="small" />
        </Box>

        <Typography variant="h6" style={{ marginTop: 16, marginBottom: 8 }}>
          🎯 Quick Start
        </Typography>
        <Box className={classes.quickStart}>
          {quickStartCommand}
        </Box>
      </CardContent>
    </Card>
  );
};