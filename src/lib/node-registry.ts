import { type LucideIcon, MessageCircle } from "lucide-react";
import type React from "react";

export interface NodeTypeConfig {
  label: string;
  description: string;
  icon: LucideIcon;
  defaultData: Record<string, unknown>;
  component?: React.ComponentType<unknown>;
}

class NodeTypeRegistry {
  private nodeTypes: Map<string, NodeTypeConfig> = new Map();

  constructor() {
    // Register default node types
    this.registerNodeType("textNode", {
      label: "Text Node",
      description: "Send a text message to the user",
      icon: MessageCircle,
      defaultData: {
        text: "Hello! This is a text message.",
      },
    });
  }

  registerNodeType(type: string, config: NodeTypeConfig) {
    this.nodeTypes.set(type, config);
  }

  getNodeType(type: string): NodeTypeConfig | undefined {
    return this.nodeTypes.get(type);
  }

  getAllNodeTypes(): Record<string, NodeTypeConfig> {
    const result: Record<string, NodeTypeConfig> = {};
    this.nodeTypes.forEach((config, type) => {
      result[type] = config;
    });
    return result;
  }

  unregisterNodeType(type: string) {
    this.nodeTypes.delete(type);
  }
}

export const nodeTypeRegistry = new NodeTypeRegistry();
