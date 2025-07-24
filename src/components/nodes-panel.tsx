"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { nodeTypeRegistry } from "@/lib/node-registry";

export function NodesPanel() {
  const nodeTypes = nodeTypeRegistry.getAllNodeTypes();

  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {Object.entries(nodeTypes).map(([key, nodeType]) => (
            <Card
              key={key}
              draggable
              onDragStart={(e) => handleDragStart(e, key)}
              className="cursor-move hover:shadow-md transition-all duration-200 hover:scale-105 border-2 border-dashed border-muted hover:border-primary/50 dark:hover:border-primary/70"
            >
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <nodeType.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{nodeType.label}</div>
                    <div className="text-sm text-muted-foreground">{nodeType.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 border-t bg-muted/50">
        <h3 className="font-medium mb-2 text-sm">How to use:</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Drag nodes to the canvas</li>
          <li>• Connect nodes by dragging handles</li>
          <li>• Click nodes to edit properties</li>
          <li>• Save to validate your flow</li>
        </ul>
      </div>
    </div>
  );
}
