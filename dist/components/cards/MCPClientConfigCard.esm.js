import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { makeStyles, Card, CardHeader, ButtonGroup, Button, CardContent, Typography, Box, Tooltip, IconButton, Snackbar } from '@material-ui/core';
import { FileCopy, Launch } from '@material-ui/icons';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%"
  },
  configView: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
    fontSize: "0.875rem",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    lineHeight: 1.5,
    position: "relative"
  },
  copyButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  },
  toggleButton: {
    borderRadius: 20,
    textTransform: "none",
    minWidth: 100,
    fontSize: "0.75rem",
    padding: theme.spacing(0.5, 1.5)
  },
  jsonKey: {
    color: theme.palette.type === "dark" ? "#79C0FF" : "#0969DA",
    fontWeight: 600
  },
  jsonString: {
    color: theme.palette.type === "dark" ? "#A5D6FF" : "#0A3069"
  },
  jsonBracket: {
    color: theme.palette.type === "dark" ? "#F85149" : "#CF222E",
    fontWeight: 600
  },
  description: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  actionButtons: {
    display: "flex",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    justifyContent: "flex-end"
  },
  vscodeButton: {
    textTransform: "none",
    borderRadius: theme.spacing(2)
  }
}));
const formatJsonWithSyntaxHighlighting = (obj, classes) => {
  const jsonString = JSON.stringify(obj, null, 2);
  const highlighted = jsonString.replace(/"([^"]+)":/g, `<span class="${classes.jsonKey}">"$1":</span>`).replace(/: "([^"]+)"/g, `: <span class="${classes.jsonString}">"$1"</span>`).replace(/: (true|false|null|\d+)/g, `: <span class="${classes.jsonString}">$1</span>`).replace(/[{}]/g, `<span class="${classes.jsonBracket}">$&</span>`).replace(/[\[\]]/g, `<span class="${classes.jsonBracket}">$&</span>`);
  return highlighted;
};
const MCPClientConfigCard = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  const [viewMode, setViewMode] = useState("vscode");
  const [copySuccess, setCopySuccess] = useState(false);
  if (!entity || entity.kind !== "MCP") {
    return null;
  }
  const spec = entity.spec;
  const { configuration } = spec;
  if (!configuration) {
    return null;
  }
  const handleTabChange = (mode) => {
    setViewMode(mode);
  };
  const generateClientConfig = () => {
    const serverName = entity.metadata.name;
    const baseConfig = {
      command: configuration.command || "npx",
      args: configuration.args || [],
      disabled: false,
      autoApprove: []
    };
    if (configuration.env && configuration.env.length > 0) {
      const envObj = {};
      configuration.env.forEach((envVar) => {
        if (envVar.value) {
          envObj[envVar.name] = envVar.value;
        } else if (envVar.valueFrom === "secret") {
          envObj[envVar.name] = `\${${envVar.name}}`;
        }
      });
      if (Object.keys(envObj).length > 0) {
        baseConfig.env = envObj;
      }
    }
    switch (viewMode) {
      case "vscode":
        return {
          "mcp.servers": {
            [serverName]: baseConfig
          }
        };
      case "generic":
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
    const config2 = generateClientConfig();
    const configText = JSON.stringify(config2, null, 2);
    try {
      await navigator.clipboard.writeText(configText);
      setCopySuccess(true);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };
  const openVSCodeSettings = () => {
    const config2 = generateClientConfig();
    const serverName = entity.metadata.name;
    const displayName = entity.metadata.description || serverName;
    const vscodeInsidersUrl = `https://insiders.vscode.dev/redirect/mcp/install?name=${encodeURIComponent(displayName)}&config=${encodeURIComponent(JSON.stringify(config2["mcp.servers"][serverName]))}`;
    try {
      window.open(vscodeInsidersUrl, "_blank");
    } catch (err) {
      copyToClipboard();
      console.log("VSCode Insiders not available, copied config to clipboard");
    }
  };
  const getConfigDescription = () => {
    switch (viewMode) {
      case "vscode":
        return "Configuration for VS Code MCP extensions (settings.json)";
      case "generic":
        return "Generic MCP client configuration format";
      default:
        return "MCP client configuration";
    }
  };
  const config = generateClientConfig();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Card, { className: classes.card, children: [
      /* @__PURE__ */ jsx(
        CardHeader,
        {
          title: "\u{1F527} Client Configuration",
          action: /* @__PURE__ */ jsxs(ButtonGroup, { size: "small", variant: "outlined", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: viewMode === "vscode" ? "contained" : "outlined",
                color: viewMode === "vscode" ? "primary" : "default",
                onClick: () => handleTabChange("vscode"),
                className: classes.toggleButton,
                children: "VSCode"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: viewMode === "generic" ? "contained" : "outlined",
                color: viewMode === "generic" ? "primary" : "default",
                onClick: () => handleTabChange("generic"),
                className: classes.toggleButton,
                children: "Generic"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx(Typography, { variant: "body2", className: classes.description, children: getConfigDescription() }),
        /* @__PURE__ */ jsxs(Box, { className: classes.configView, children: [
          /* @__PURE__ */ jsx(Tooltip, { title: "Copy to clipboard", children: /* @__PURE__ */ jsx(
            IconButton,
            {
              size: "small",
              onClick: copyToClipboard,
              className: classes.copyButton,
              children: /* @__PURE__ */ jsx(FileCopy, { fontSize: "small" })
            }
          ) }),
          /* @__PURE__ */ jsx(
            Box,
            {
              dangerouslySetInnerHTML: {
                __html: formatJsonWithSyntaxHighlighting(config, classes)
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Box, { className: classes.actionButtons, children: [
          viewMode === "vscode" && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "contained",
              color: "primary",
              size: "small",
              startIcon: /* @__PURE__ */ jsx(Launch, {}),
              onClick: openVSCodeSettings,
              className: classes.vscodeButton,
              children: "Add to VSCode"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outlined",
              size: "small",
              startIcon: /* @__PURE__ */ jsx(FileCopy, {}),
              onClick: copyToClipboard,
              children: "Copy Config"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Snackbar,
      {
        open: copySuccess,
        autoHideDuration: 2e3,
        onClose: () => setCopySuccess(false),
        message: "Configuration copied to clipboard!",
        anchorOrigin: { vertical: "bottom", horizontal: "center" }
      }
    )
  ] });
};

export { MCPClientConfigCard };
//# sourceMappingURL=MCPClientConfigCard.esm.js.map
