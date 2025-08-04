import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  makeStyles,
  Button,
  IconButton,
  Tooltip,
  Snackbar,
  ButtonGroup,
} from '@material-ui/core';
import {
  FileCopy as CopyIcon,
  Launch as LaunchIcon,
} from '@material-ui/icons';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
  configView: {
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
    fontSize: '0.875rem',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    lineHeight: 1.5,
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  toggleButton: {
    borderRadius: 20,
    textTransform: 'none',
    minWidth: 100,
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
  description: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  actionButtons: {
    display: 'flex',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  vscodeButton: {
    textTransform: 'none',
    borderRadius: theme.spacing(2),
  },
}));

const formatJsonWithSyntaxHighlighting = (obj: any, classes: any) => {
  const jsonString = JSON.stringify(obj, null, 2);
  
  // Simple syntax highlighting using regex
  const highlighted = jsonString
    .replace(/"([^"]+)":/g, `<span class="${classes.jsonKey}">"$1":</span>`)
    .replace(/: "([^"]+)"/g, `: <span class="${classes.jsonString}">"$1"</span>`)
    .replace(/: (true|false|null|\d+)/g, `: <span class="${classes.jsonString}">$1</span>`)
    .replace(/[{}]/g, `<span class="${classes.jsonBracket}">$&</span>`)
    .replace(/[\[\]]/g, `<span class="${classes.jsonBracket}">$&</span>`);
  
  return highlighted;
};

export const MCPClientConfigCard = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  const [viewMode, setViewMode] = useState<'vscode' | 'generic'>('vscode');
  const [copySuccess, setCopySuccess] = useState(false);
  
  if (!entity || entity.kind !== 'MCP') {
    return null;
  }

  const spec = entity.spec as any;
  const { configuration } = spec;
  
  if (!configuration) {
    return null;
  }

  const handleTabChange = (mode: 'vscode' | 'generic') => {
    setViewMode(mode);
  };

  const generateClientConfig = () => {
    const serverName = entity.metadata.name;
    const baseConfig: any = {
      command: configuration.command || 'npx',
      args: configuration.args || [],
      disabled: false,
      autoApprove: []
    };

    // Add environment variables if they exist
    if (configuration.env && configuration.env.length > 0) {
      const envObj: Record<string, string> = {};
      configuration.env.forEach((envVar: any) => {
        if (envVar.value) {
          envObj[envVar.name] = envVar.value;
        } else if (envVar.valueFrom === 'secret') {
          envObj[envVar.name] = `$\{${envVar.name}\}`;
        }
      });
      if (Object.keys(envObj).length > 0) {
        baseConfig.env = envObj;
      }
    }

    switch (viewMode) {
      case 'vscode':
        return {
          "mcp.servers": {
            [serverName]: baseConfig
          }
        };
      
      case 'generic':
        return {
          servers: {
            [serverName]: baseConfig
          }
        };
      
      default:
        return baseConfig;
    }
  };

  const copyToClipboard = async () => {
    const config = generateClientConfig();
    const configText = JSON.stringify(config, null, 2);
    
    try {
      await navigator.clipboard.writeText(configText);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const openVSCodeSettings = () => {
    const config = generateClientConfig();
    const serverName = entity.metadata.name;
    const displayName = entity.metadata.description || serverName;
    
    // Use the same approach as mcpservers.org
    const vscodeInsidersUrl = `https://insiders.vscode.dev/redirect/mcp/install?name=${encodeURIComponent(displayName)}&config=${encodeURIComponent(JSON.stringify(config['mcp.servers'][serverName]))}`;
    
    try {
      // Try VSCode Insiders redirect first (like mcpservers.org)
      window.open(vscodeInsidersUrl, '_blank');
    } catch (err) {
      // Fallback: copy configuration to clipboard
      copyToClipboard();
      console.log('VSCode Insiders not available, copied config to clipboard');
    }
  };

  const getConfigDescription = () => {
    switch (viewMode) {
      case 'vscode':
        return 'Configuration for VS Code MCP extensions (settings.json)';
      case 'generic':
        return 'Generic MCP client configuration format';
      default:
        return 'MCP client configuration';
    }
  };

  const config = generateClientConfig();

  return (
    <>
      <Card className={classes.card}>
        <CardHeader 
          title="🔧 Client Configuration" 
          action={
            <ButtonGroup size="small" variant="outlined">
              <Button
                variant={viewMode === 'vscode' ? 'contained' : 'outlined'}
                color={viewMode === 'vscode' ? 'primary' : 'default'}
                onClick={() => handleTabChange('vscode')}
                className={classes.toggleButton}
              >
                VSCode
              </Button>
              <Button
                variant={viewMode === 'generic' ? 'contained' : 'outlined'}
                color={viewMode === 'generic' ? 'primary' : 'default'}
                onClick={() => handleTabChange('generic')}
                className={classes.toggleButton}
              >
                Generic
              </Button>
            </ButtonGroup>
          }
        />
        <CardContent>
          <Typography variant="body2" className={classes.description}>
            {getConfigDescription()}
          </Typography>
          
          <Box className={classes.configView}>
            <Tooltip title="Copy to clipboard">
              <IconButton
                size="small"
                onClick={copyToClipboard}
                className={classes.copyButton}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Box 
              dangerouslySetInnerHTML={{
                __html: formatJsonWithSyntaxHighlighting(config, classes)
              }}
            />
          </Box>
          
          <Box className={classes.actionButtons}>
            {viewMode === 'vscode' && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<LaunchIcon />}
                onClick={openVSCodeSettings}
                className={classes.vscodeButton}
              >
                Add to VSCode
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              startIcon={<CopyIcon />}
              onClick={copyToClipboard}
            >
              Copy Config
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Configuration copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};