import type { Edge, Node } from "@xyflow/react";

export function validateFlow(nodes: Node[], edges: Edge[]): string | null {
  if (nodes.length === 0) {
    return "Flow must contain at least one node.";
  }

  if (nodes.length === 1) {
    return null; // Single node flows are valid
  }

  // Check for nodes with no outgoing edges
  const nodesWithoutOutgoingEdges = nodes.filter((node) => {
    return !edges.some((edge) => edge.source === node.id);
  });

  if (nodesWithoutOutgoingEdges.length > 1) {
    return `Flow validation failed: ${nodesWithoutOutgoingEdges.length} nodes have no outgoing connections. Only one end node is allowed.`;
  }

  // Check for disconnected nodes (nodes with no incoming or outgoing edges)
  const disconnectedNodes = nodes.filter((node) => {
    const hasIncoming = edges.some((edge) => edge.target === node.id);
    const hasOutgoing = edges.some((edge) => edge.source === node.id);
    return !hasIncoming && !hasOutgoing;
  });

  if (disconnectedNodes.length > 0) {
    return `Flow contains ${disconnectedNodes.length} disconnected node(s). All nodes must be connected to the flow.`;
  }

  return null; // Flow is valid
}
