"use client";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
import { MessageCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type TextNodeType = Node<{
  text: string;
}>;

export function TextNode({ data, selected }: NodeProps<TextNodeType>) {
  return (
    <Card
      className={`transition-all ${selected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"}`}
    >
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Text Message</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {data.text || "Click to edit message..."}
        </div>
      </CardContent>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary border-2 border-background"
      />
    </Card>
  );
}
