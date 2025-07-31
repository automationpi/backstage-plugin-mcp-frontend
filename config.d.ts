export interface Config {
  /** Configuration for the MCP plugin */
  mcp?: {
    /**
     * Whether to enable the MCP plugin
     * @default true
     */
    enabled?: boolean;
  };
}