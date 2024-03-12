"use client"
 
import * as React from "react";

import { Handle, Position } from "reactflow";

import { useCompletion } from "ai/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
 
function CompletionNode() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/completion',
  });
 
  return (
    <div className="shadow-md bg-background border-y px-4 py-2 flex flex-col h-max">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Label>
          Say something...
        </Label>
          <Input
            className="w-full"
            value={input}
            onChange={handleInputChange}
          />
        <Label>Completion result:</Label>
        <Textarea
          className="w-full"
          value={completion}
          readOnly
        />
        <div className="mt-2 flex items-center gap-2 justify-end">
        <Button variant="secondary" onClick={stop}>
          Stop
        </Button>
        <Button disabled={isLoading} type="submit">
          Send
        </Button>
        </div>
      </form>
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

export default React.memo(CompletionNode);