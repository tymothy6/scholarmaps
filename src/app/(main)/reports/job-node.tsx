"use client";

import * as React from "react";

import { Handle, Position } from "reactflow";

import { NodeData, JobNodeData, useFlowContext } from "./context/flow-provider";

import { Input } from "@/components/ui/input";

// Type guard to check if data if of the expected type
function isJobNodeData(data: NodeData): data is JobNodeData {
  return "name" in data && "emoji" in data && "job" in data;
}

function JobNode({ id, data }: { id: string; data: NodeData }) {
  const { updateNodeData } = useFlowContext();

  // Use type guard to check if data is JobNodeData
  if (!isJobNodeData(data)) {
    throw new Error("Invalid node data for JobNode");
  }
  const dataName = data.name;

  const [isEditingName, setIsEditingName] = React.useState(false);
  const [name, setName] = React.useState(dataName);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
    updateNodeData(id, { name }); // call update when editing is done
  };

  const onChange = React.useCallback((evt: InputEvent) => {
    if (evt.target) {
      console.log((evt.target as HTMLInputElement).value);
    }
  }, []);

  return (
    <div className="px-4 py-2 shadow-md bg-background border-y">
      <div className="flex">
        <div className="rounded-full w-8 h-8 flex justify-center items-center bg-accent">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-sm font-bold font-hubotSans">
            {isEditingName ? (
              <Input
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                className="max-w-[100px] h-max p-0.5"
                autoFocus
              />
            ) : (
              <p
                className="w-max cursor-pointer"
                onClick={() => setIsEditingName(true)}
              >
                {data.name}
              </p>
            )}
          </div>
          <div className="text-sm text-muted-foreground font-sans">
            {data.job}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-primary/50 hover:!bg-primary !h-full !w-2 !rounded-none !rounded-tl-lg !rounded-bl-lg !border-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-primary/50 hover:!bg-primary !h-full !w-2 !rounded-none !rounded-tr-lg !rounded-br-lg !border-0"
      />
    </div>
  );
}

export default React.memo(JobNode);
