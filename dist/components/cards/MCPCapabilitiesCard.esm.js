import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { makeStyles, Card, CardHeader, Button, CardContent, Typography, Box, List, ListItem, ListItemText } from '@material-ui/core';
import { Build, Storage, Chat } from '@material-ui/icons';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%"
  },
  section: {
    marginBottom: theme.spacing(2)
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  list: {
    paddingTop: 0
  },
  listItem: {
    paddingLeft: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem"
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
  }
}));
const formatJsonWithSyntaxHighlighting = (obj, classes) => {
  const jsonString = JSON.stringify(obj, null, 2);
  const highlighted = jsonString.replace(/"([^"]+)":/g, `<span class="${classes.jsonKey}">"$1":</span>`).replace(/: "([^"]+)"/g, `: <span class="${classes.jsonString}">"$1"</span>`).replace(/[{}]/g, `<span class="${classes.jsonBracket}">$&</span>`).replace(/[\[\]]/g, `<span class="${classes.jsonBracket}">$&</span>`);
  return highlighted;
};
const renderCapabilityList = (items, icon, title, classes) => {
  if (!items || items.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Box, { className: classes.section, children: [
    /* @__PURE__ */ jsxs(Typography, { variant: "h6", className: classes.sectionTitle, children: [
      icon,
      title,
      " (",
      items.length,
      ")"
    ] }),
    /* @__PURE__ */ jsx(List, { className: classes.list, children: items.map((item, index) => {
      const name = typeof item === "string" ? item : item.name;
      const description = typeof item === "object" ? item.description : void 0;
      return /* @__PURE__ */ jsx(ListItem, { className: classes.listItem, children: /* @__PURE__ */ jsx(
        ListItemText,
        {
          primary: name,
          secondary: description && /* @__PURE__ */ jsx(Typography, { className: classes.description, children: description })
        }
      ) }, index);
    }) })
  ] });
};
const MCPCapabilitiesCard = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  const [viewMode, setViewMode] = useState("text");
  if (!entity || entity.kind !== "MCP") {
    return null;
  }
  const spec = entity.spec;
  const capabilities = spec.capabilities || {};
  const { tools, resources, prompts } = capabilities;
  const hasCapabilities = tools && tools.length > 0 || resources && resources.length > 0 || prompts && prompts.length > 0;
  const toggleViewMode = () => {
    setViewMode(viewMode === "text" ? "json" : "text");
  };
  const renderJsonView = () => /* @__PURE__ */ jsx(
    Box,
    {
      className: classes.jsonView,
      dangerouslySetInnerHTML: {
        __html: formatJsonWithSyntaxHighlighting(capabilities, classes)
      }
    }
  );
  return /* @__PURE__ */ jsxs(Card, { className: classes.card, children: [
    /* @__PURE__ */ jsx(
      CardHeader,
      {
        title: "\u{1F6E0}\uFE0F Capabilities",
        action: hasCapabilities && /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(CardContent, { children: !hasCapabilities ? /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "textSecondary", children: "No capabilities defined for this MCP server." }) : /* @__PURE__ */ jsx(Fragment, { children: viewMode === "json" ? renderJsonView() : /* @__PURE__ */ jsxs(Fragment, { children: [
      renderCapabilityList(
        tools,
        /* @__PURE__ */ jsx(Build, { fontSize: "small" }),
        "Tools",
        classes
      ),
      renderCapabilityList(
        resources,
        /* @__PURE__ */ jsx(Storage, { fontSize: "small" }),
        "Resources",
        classes
      ),
      renderCapabilityList(
        prompts,
        /* @__PURE__ */ jsx(Chat, { fontSize: "small" }),
        "Prompts",
        classes
      )
    ] }) }) })
  ] });
};

export { MCPCapabilitiesCard };
//# sourceMappingURL=MCPCapabilitiesCard.esm.js.map
