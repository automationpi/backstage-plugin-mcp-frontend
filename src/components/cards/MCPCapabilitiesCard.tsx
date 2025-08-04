import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  makeStyles,
  Button,
  Chip,
} from '@material-ui/core';
import {
  Build as ToolIcon,
  Storage as ResourceIcon,
  Chat as PromptIcon,
} from '@material-ui/icons';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  list: {
    paddingTop: 0,
  },
  listItem: {
    paddingLeft: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
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

const renderCapabilityList = (
  items: (string | { name: string; description?: string })[] | undefined,
  icon: React.ReactNode,
  title: string,
  classes: any,
) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box className={classes.section}>
      <Typography variant="h6" className={classes.sectionTitle}>
        {icon}
        {title} ({items.length})
      </Typography>
      <List className={classes.list}>
        {items.map((item, index) => {
          const name = typeof item === 'string' ? item : item.name;
          const description = typeof item === 'object' ? item.description : undefined;
          
          return (
            <ListItem key={index} className={classes.listItem}>
              <ListItemText
                primary={name}
                secondary={description && (
                  <Typography className={classes.description}>
                    {description}
                  </Typography>
                )}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export const MCPCapabilitiesCard = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  const [viewMode, setViewMode] = useState<'text' | 'json'>('text');
  
  if (!entity || entity.kind !== 'MCP') {
    return null;
  }

  const spec = entity.spec as any;
  const capabilities = spec.capabilities || {};
  const { tools, resources, prompts } = capabilities;

  const hasCapabilities = 
    (tools && tools.length > 0) ||
    (resources && resources.length > 0) ||
    (prompts && prompts.length > 0);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'text' ? 'json' : 'text');
  };

  const renderJsonView = () => (
    <Box 
      className={classes.jsonView}
      dangerouslySetInnerHTML={{
        __html: formatJsonWithSyntaxHighlighting(capabilities, classes)
      }}
    />
  );

  return (
    <Card className={classes.card}>
      <CardHeader 
        title="🛠️ Capabilities" 
        action={
          hasCapabilities && (
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
        {!hasCapabilities ? (
          <Typography variant="body2" color="textSecondary">
            No capabilities defined for this MCP server.
          </Typography>
        ) : (
          <>
            {viewMode === 'json' ? renderJsonView() : (
              <>
                {renderCapabilityList(
                  tools,
                  <ToolIcon fontSize="small" />,
                  'Tools',
                  classes,
                )}
                {renderCapabilityList(
                  resources,
                  <ResourceIcon fontSize="small" />,
                  'Resources',
                  classes,
                )}
                {renderCapabilityList(
                  prompts,
                  <PromptIcon fontSize="small" />,  
                  'Prompts',
                  classes,
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};