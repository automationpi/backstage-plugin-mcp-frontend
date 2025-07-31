import { jsxs, jsx } from 'react/jsx-runtime';
import { makeStyles, Card, CardHeader, CardContent, Box, Typography, Chip } from '@material-ui/core';
import { StatusWarning, StatusError, StatusOK } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%"
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  quickStart: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[800] : theme.palette.grey[900],
    color: theme.palette.type === "dark" ? theme.palette.text.primary : theme.palette.common.white,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontFamily: "monospace",
    fontSize: "0.875rem",
    marginTop: theme.spacing(2)
  }
}));
const getLifecycleIcon = (lifecycle) => {
  switch (lifecycle) {
    case "production":
      return /* @__PURE__ */ jsx(StatusOK, {});
    case "experimental":
      return /* @__PURE__ */ jsx(StatusWarning, {});
    case "deprecated":
      return /* @__PURE__ */ jsx(StatusError, {});
    default:
      return /* @__PURE__ */ jsx(StatusWarning, {});
  }
};
const getLifecycleColor = (lifecycle) => {
  switch (lifecycle) {
    case "production":
      return "primary";
    case "experimental":
      return "default";
    case "deprecated":
      return "secondary";
    default:
      return "default";
  }
};
const MCPOverviewCard = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  if (!entity || entity.kind !== "MCP") {
    return null;
  }
  const spec = entity.spec;
  const { transport, runtime, type, lifecycle, configuration } = spec;
  const quickStartCommand = configuration?.command && configuration?.args ? `${configuration.command} ${configuration.args.join(" ")}` : "Configuration details in Configuration tab";
  return /* @__PURE__ */ jsxs(Card, { className: classes.card, children: [
    /* @__PURE__ */ jsx(CardHeader, { title: "\u{1F680} MCP Overview" }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxs(Box, { className: classes.statusContainer, children: [
        getLifecycleIcon(lifecycle),
        /* @__PURE__ */ jsxs(Typography, { variant: "body2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Status:" }),
          " ",
          lifecycle || "Unknown"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body2", gutterBottom: true, children: [
        /* @__PURE__ */ jsx("strong", { children: "Type:" }),
        " ",
        type
      ] }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body2", gutterBottom: true, children: [
        /* @__PURE__ */ jsx("strong", { children: "Runtime:" }),
        " ",
        runtime
      ] }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body2", gutterBottom: true, children: [
        /* @__PURE__ */ jsx("strong", { children: "Transport:" }),
        " ",
        transport
      ] }),
      /* @__PURE__ */ jsxs(Box, { className: classes.chipContainer, children: [
        /* @__PURE__ */ jsx(
          Chip,
          {
            label: lifecycle,
            color: getLifecycleColor(lifecycle),
            size: "small"
          }
        ),
        /* @__PURE__ */ jsx(Chip, { label: runtime, variant: "outlined", size: "small" }),
        /* @__PURE__ */ jsx(Chip, { label: transport, variant: "outlined", size: "small" }),
        /* @__PURE__ */ jsx(Chip, { label: type, variant: "outlined", size: "small" })
      ] }),
      /* @__PURE__ */ jsx(Typography, { variant: "h6", style: { marginTop: 16, marginBottom: 8 }, children: "\u{1F3AF} Quick Start" }),
      /* @__PURE__ */ jsx(Box, { className: classes.quickStart, children: quickStartCommand })
    ] })
  ] });
};

export { MCPOverviewCard };
//# sourceMappingURL=MCPOverviewCard.esm.js.map
