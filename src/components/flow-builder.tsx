"use client";

import "@xyflow/react/dist/style.css";

import {
  addEdge,
  Background,
  type Connection,
  Controls,
  MiniMap,
  type Node,
  type NodeTypes,
  type OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useTheme } from "next-themes";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { validateFlow } from "@/lib/flow-validation";
import { nodeTypeRegistry } from "@/lib/node-registry";

import { Navbar } from "./navbar";
import { TextNode } from "./nodes/text-node";
import { NodesPanel } from "./nodes-panel";
import { SettingsPanel } from "./settings-panel";

type TextNodeData = {
  text: string;
};

type NodeData = TextNodeData;

type CustomEdge = {
  id: string;
  source: string;
  target: string;
  type?: string;
};

const nodeTypes: NodeTypes = {
  textNode: TextNode,
};

export function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge>([]);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);
      if (sourceHasEdge) {
        toast.error("Each node can only have one outgoing connection");
        return;
      }

      setEdges((eds) => addEdge({ ...params, type: "default" }, eds));
      toast.success("Nodes connected successfully");
    },
    [edges, setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;

      const nodeConfig = nodeTypeRegistry.getNodeType(nodeType);
      if (!nodeConfig) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node<TextNodeData> = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position,
        data: { ...nodeConfig.defaultData } as TextNodeData,
      };

      setNodes((nds) => [...nds, newNode]);
      toast.success(`${nodeConfig.label} added to flow`);
    },
    [screenToFlowPosition, setNodes],
  );

  const updateNodeData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (nodeId: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node,
        ),
      );

      if (selectedNode?.id === nodeId) {
        setSelectedNode((prev) => (prev ? { ...prev, data: { ...prev.data, ...data } } : null));
      }
    },
    [setNodes, selectedNode],
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
      }
      toast.success("Node deleted successfully");
    },
    [setNodes, setEdges, selectedNode],
  );

  const handleSave = useCallback(() => {
    const error = validateFlow(nodes, edges);
    if (error) {
      toast.error(error);
    } else {
      console.log("Flow saved successfully!", { nodes, edges });
      toast.success("Flow saved successfully!");
    }
  }, [nodes, edges]);

  return (
    <div className="h-full flex flex-col bg-background">
      <Navbar onSave={handleSave} />
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-80 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {selectedNode ? (
              <SettingsPanel
                node={selectedNode}
                onUpdateNode={updateNodeData}
                onDeleteNode={deleteNode}
                onClose={() => setSelectedNode(null)}
              />
            ) : (
              <NodesPanel />
            )}
          </div>

          {/* Main Flow Area */}
          <div className="flex-1" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background className="bg-muted/20" />
              <Controls className="bg-background dark:text-background border border-border" />
              <MiniMap
                className="bg-background border border-border"
                maskColor={mounted && theme === "dark" ? "bg-foreground" : ""}
              />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}
