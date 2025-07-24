"use client";

import type { Node } from "@xyflow/react";
import { Settings2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { nodeTypeRegistry } from "@/lib/node-registry";

interface SettingsPanelProps {
  node: Node;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdateNode: (nodeId: string, data: any) => void;
  onDeleteNode: (nodeId: string) => void;
  onClose: () => void;
}

export function SettingsPanel({ node, onUpdateNode, onDeleteNode, onClose }: SettingsPanelProps) {
  const nodeConfig = node.type ? nodeTypeRegistry.getNodeType(node.type) : undefined;

  if (!nodeConfig) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">Unknown node type: {node.type}</p>
      </div>
    );
  }

  const handleTextChange = (value: string) => {
    onUpdateNode(node.id, { text: value });
    toast.success("Node updated");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this node?")) {
      onDeleteNode(node.id);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Node Settings</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="node-id" className="text-sm font-medium">
                Node ID
              </Label>
              <div className="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded border">
                {node.id}
              </div>
            </div>

            {node.type === "textNode" && (
              <div className="space-y-2">
                <Label htmlFor="message-text" className="text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="message-text"
                  value={typeof node.data?.text === "string" ? node.data.text : ""}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Enter your message text..."
                  rows={4}
                  className="resize-none bg-background"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Node Information */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Node Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Type:</dt>
                <dd className="font-medium">{nodeConfig.label}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Position:</dt>
                <dd className="font-mono text-xs">
                  ({Math.round(node.position.x)}, {Math.round(node.position.y)})
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="mt-4 border-destructive/20 dark:border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-2 w-full"
            >
              <Trash2 className="w-4 h-4" />
              Delete Node
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
