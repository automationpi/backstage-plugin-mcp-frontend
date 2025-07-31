import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  makeStyles,
  Button,
} from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  codeBlock: {
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[900],
    color: theme.palette.type === 'dark' ? theme.palette.text.primary : theme.palette.common.white,
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    marginBottom: theme.spacing(2),
    overflowX: 'auto',
  },
  jsonView: {
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
    fontSize: '0.875rem',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    lineHeight: 1.5,
  },
  toggleButton: {
    borderRadius: 20,
    textTransform: 'none',
    minWidth: 80,
    fontSize: '0.75rem',
    padding: theme.spacing(0.5, 1.5),
  },
  jsonKey: {
    color: theme.palette.type === 'dark' ? '#79C0FF' : '#0969DA',
    fontWeight: 600,
  },
  jsonString: {
    color: theme.palette.type === 'dark' ? '#A5D6FF' : '#0A3069',
  },
  jsonBracket: {
    color: theme.palette.type === 'dark' ? '#F85149' : '#CF222E',
    fontWeight: 600,
  },
  table: {
    marginBottom: theme.spacing(2),
  },
  envChip: {
    margin: theme.spacing(0.25),
    fontSize: '0.75rem',
  },
}));

const formatJsonWithSyntaxHighlighting = (obj: any, classes: any) => {
  const jsonString = JSON.stringify(obj, null, 2);
  
  // Simple syntax highlighting using regex
  const highlighted = jsonString
    .replace(/"([^"]+)":/g, `<span class="${classes.jsonKey}">"$1":</span>`)
    .replace(/: "([^"]+)"/g, `: <span class="${classes.jsonString}">"$1"</span>`)
    .replace(/[{}]/g, `<span class="${classes.jsonBracket}">$&</span>`)
    .replace(/[\[\]]/g, `<span class="${classes.jsonBracket}">$&</span>`);
  
  return highlighted;
};

export const MCPConfigurationCard = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  const [viewMode, setViewMode] = useState<'text' | 'json'>('text');
  
  if (!entity || entity.kind !== 'MCP') {
    return null;
  }

  const spec = entity.spec as any;
  const { configuration, authentication } = spec;
  
  const hasConfiguration = configuration || authentication;
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'text' ? 'json' : 'text');
  };

  const renderJsonView = () => (
    <Box 
      className={classes.jsonView}
      dangerouslySetInnerHTML={{
        __html: formatJsonWithSyntaxHighlighting({ configuration, authentication }, classes)
      }}
    />
  );

  const renderEnvironmentVariables = (env: any[]) => {
    if (!env || env.length === 0) return null;

    return (
      <Box className={classes.section}>
        <Typography variant="h6" gutterBottom>
          🔧 Environment Variables
        </Typography>
        <Box>
          {env.map((envVar, index) => {
            const isSecret = envVar.valueFrom === 'secret';
            const value = envVar.value || (isSecret ? '(from secret)' : '(not set)');
            
            return (
              <Chip
                key={index}
                label={`${envVar.name}=${value}`}
                variant={isSecret ? 'default' : 'outlined'}
                color={isSecret ? 'secondary' : 'default'}
                className={classes.envChip}
                size="small"
              />
            );
          })}
        </Box>
      </Box>
    );
  };

  const renderAuthentication = (auth: any) => {
    if (!auth) return null;

    return (
      <Box className={classes.section}>
        <Typography variant="h6" gutterBottom>
          🔑 Authentication
        </Typography>
        <Table size="small" className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell>{auth.type}</TableCell>
            </TableRow>
            {auth.provider && (
              <TableRow>
                <TableCell><strong>Provider</strong></TableCell>
                <TableCell>{auth.provider}</TableCell>
              </TableRow>
            )}
            {auth.config && Object.entries(auth.config).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell><strong>{key}</strong></TableCell>
                <TableCell>{String(value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  };

  const renderCommandInfo = () => {
    if (!configuration) return null;

    const { command, args, timeout, url } = configuration;
    
    if (command && args) {
      const fullCommand = `${command} ${args.join(' ')}`;
      return (
        <Box className={classes.section}>
          <Typography variant="h6" gutterBottom>
            🚀 Start Command
          </Typography>
          <Box className={classes.codeBlock}>
            {fullCommand}
          </Box>
        </Box>
      );
    }

    if (url) {
      return (
        <Box className={classes.section}>
          <Typography variant="h6" gutterBottom>
            🌐 Server URL
          </Typography>
          <Box className={classes.codeBlock}>
            {url}
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <Card className={classes.card}>
      <CardHeader 
        title="⚙️ Configuration" 
        action={
          hasConfiguration && (
            <Button
              variant={viewMode === 'json' ? 'contained' : 'outlined'}
              color={viewMode === 'json' ? 'primary' : 'default'}
              size="small"
              onClick={toggleViewMode}
              className={classes.toggleButton}
            >
              {viewMode === 'text' ? 'JSON' : 'Text'}
            </Button>
          )
        }
      />
      <CardContent>
        {!hasConfiguration ? (
          <Typography variant="body2" color="textSecondary">
            No configuration details available.
          </Typography>
        ) : (
          <>
            {viewMode === 'json' ? renderJsonView() : (
              <>
                {renderCommandInfo()}
                {configuration?.env && renderEnvironmentVariables(configuration.env)}
                {authentication && renderAuthentication(authentication)}
                
                {configuration?.timeout && (
                  <Typography variant="body2" color="textSecondary">
                    <strong>Timeout:</strong> {configuration.timeout}ms
                  </Typography>
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};