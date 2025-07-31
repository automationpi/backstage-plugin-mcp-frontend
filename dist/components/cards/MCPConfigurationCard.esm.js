import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { makeStyles, Card, CardHeader, Button, CardContent, Typography, Box, Chip, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%"
  },
  section: {
    marginBottom: theme.spacing(2)
  },
  codeBlock: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[800] : theme.palette.grey[900],
    color: theme.palette.type === "dark" ? theme.palette.text.primary : theme.palette.common.white,
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    fontFamily: "monospace",
    fontSize: "0.875rem",
    marginBottom: theme.spacing(2),
    overflowX: "auto"
  },
  jsonView: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
    fontSize: "0.875rem",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    lineHeight: 1.5
  },
  toggleButton: {
    borderRadius: 20,
    textTransform: "none",
    minWidth: 80,
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
  table: {
    marginBottom: theme.spacing(2)
  },
  envChip: {
    margin: theme.spacing(0.25),
    fontSize: "0.75rem"
  }
}));
const formatJsonWithSyntaxHighlighting = (obj, classes) => {
  const jsonString = JSON.stringify(obj, null, 2);
  const highlighted = jsonString.replace(/"([^"]+)":/g, `<span class="${classes.jsonKey}">"$1":</span>`).replace(/: "([^"]+)"/g, `: <span class="${classes.jsonString}">"$1"</span>`).replace(/[{}]/g, `<span class="${classes.jsonBracket}">$&</span>`).replace(/[\[\]]/g, `<span class="${classes.jsonBracket}">$&</span>`);
  return highlighted;
};
const MCPConfigurationCard = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  const [viewMode, setViewMode] = useState("text");
  if (!entity || entity.kind !== "MCP") {
    return null;
  }
  const spec = entity.spec;
  const { configuration, authentication } = spec;
  const hasConfiguration = configuration || authentication;
  const toggleViewMode = () => {
    setViewMode(viewMode === "text" ? "json" : "text");
  };
  const renderJsonView = () => /* @__PURE__ */ jsx(
    Box,
    {
      className: classes.jsonView,
      dangerouslySetInnerHTML: {
        __html: formatJsonWithSyntaxHighlighting({ configuration, authentication }, classes)
      }
    }
  );
  const renderEnvironmentVariables = (env) => {
    if (!env || env.length === 0) return null;
    return /* @__PURE__ */ jsxs(Box, { className: classes.section, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "\u{1F527} Environment Variables" }),
      /* @__PURE__ */ jsx(Box, { children: env.map((envVar, index) => {
        const isSecret = envVar.valueFrom === "secret";
        const value = envVar.value || (isSecret ? "(from secret)" : "(not set)");
        return /* @__PURE__ */ jsx(
          Chip,
          {
            label: `${envVar.name}=${value}`,
            variant: isSecret ? "default" : "outlined",
            color: isSecret ? "secondary" : "default",
            className: classes.envChip,
            size: "small"
          },
          index
        );
      }) })
    ] });
  };
  const renderAuthentication = (auth) => {
    if (!auth) return null;
    return /* @__PURE__ */ jsxs(Box, { className: classes.section, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "\u{1F511} Authentication" }),
      /* @__PURE__ */ jsx(Table, { size: "small", className: classes.table, children: /* @__PURE__ */ jsxs(TableBody, { children: [
        /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("strong", { children: "Type" }) }),
          /* @__PURE__ */ jsx(TableCell, { children: auth.type })
        ] }),
        auth.provider && /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("strong", { children: "Provider" }) }),
          /* @__PURE__ */ jsx(TableCell, { children: auth.provider })
        ] }),
        auth.config && Object.entries(auth.config).map(([key, value]) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("strong", { children: key }) }),
          /* @__PURE__ */ jsx(TableCell, { children: String(value) })
        ] }, key))
      ] }) })
    ] });
  };
  const renderCommandInfo = () => {
    if (!configuration) return null;
    const { command, args, timeout, url } = configuration;
    if (command && args) {
      const fullCommand = `${command} ${args.join(" ")}`;
      return /* @__PURE__ */ jsxs(Box, { className: classes.section, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "\u{1F680} Start Command" }),
        /* @__PURE__ */ jsx(Box, { className: classes.codeBlock, children: fullCommand })
      ] });
    }
    if (url) {
      return /* @__PURE__ */ jsxs(Box, { className: classes.section, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "\u{1F310} Server URL" }),
        /* @__PURE__ */ jsx(Box, { className: classes.codeBlock, children: url })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsxs(Card, { className: classes.card, children: [
    /* @__PURE__ */ jsx(
      CardHeader,
      {
        title: "\u2699\uFE0F Configuration",
        action: hasConfiguration && /* @__PURE__ */ jsx(
          Button,
          {
            variant: viewMode === "json" ? "contained" : "outlined",
            color: viewMode === "json" ? "primary" : "default",
            size: "small",
            onClick: toggleViewMode,
            className: classes.toggleButton,
            children: viewMode === "text" ? "JSON" : "Text"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(CardContent, { children: !hasConfiguration ? /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "textSecondary", children: "No configuration details available." }) : /* @__PURE__ */ jsx(Fragment, { children: viewMode === "json" ? renderJsonView() : /* @__PURE__ */ jsxs(Fragment, { children: [
      renderCommandInfo(),
      configuration?.env && renderEnvironmentVariables(configuration.env),
      authentication && renderAuthentication(authentication),
      configuration?.timeout && /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "textSecondary", children: [
        /* @__PURE__ */ jsx("strong", { children: "Timeout:" }),
        " ",
        configuration.timeout,
        "ms"
      ] })
    ] }) }) })
  ] });
};

export { MCPConfigurationCard };
//# sourceMappingURL=MCPConfigurationCard.esm.js.map
