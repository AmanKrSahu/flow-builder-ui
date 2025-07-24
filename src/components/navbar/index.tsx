"use client";

import { Bot, ChevronsUpDown, Lock, Save, Settings, Share } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeToggle } from "../theme/theme-toggle";
import { UserAvatar } from "../user-avatar";

interface NavbarProps {
  onSave: () => void;
}

export function Navbar({ onSave }: NavbarProps) {
  const [selectedWorkspace, setSelectedWorkspace] = useState("My Workspace");
  const [selectedProject, setSelectedProject] = useState("Customer Support Bot");

  const workspaces = ["My Workspace", "Team Workspace", "Enterprise Workspace"];

  const projects = ["Customer Support Bot", "Sales Assistant", "FAQ Bot", "Lead Generation Bot"];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">FlowBot</span>
          </div>
          <span className="text-muted-foreground">/</span>

          {/* Workspace Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                {selectedWorkspace}
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {workspaces.map((workspace) => (
                <DropdownMenuItem key={workspace} onClick={() => setSelectedWorkspace(workspace)}>
                  {workspace}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-muted-foreground">/</span>

          {/* Project Dropdown with Private Badge */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  {selectedProject}
                  <ChevronsUpDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {projects.map((project) => (
                  <DropdownMenuItem key={project} onClick={() => setSelectedProject(project)}>
                    {project}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Private
            </Badge>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>

          <ThemeToggle />

          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Share className="w-4 h-4" />
            Share
          </Button>

          <Button onClick={onSave} size="sm" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Flow
          </Button>

          <UserAvatar />
        </div>
      </div>
    </nav>
  );
}
