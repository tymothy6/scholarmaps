"use client";

import * as React from "react";

import { Handle, Position } from "reactflow";

import { useFlowContext } from "./context/flow-provider";

import { useChat } from "ai/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

function ChatNode({ id }: { id: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { updateNodeData } = useFlowContext();

  const updateMessages = React.useCallback(
    (newMessages: typeof messages) => {
      updateNodeData(id, { messages: newMessages });
    },
    [updateNodeData, id],
  );

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
    updateMessages([...messages]);
  };

  // Watch for changes to messages in real-time
  // Persist messages in route handler
  React.useEffect(() => {
    updateMessages(messages);
  }, [messages, updateMessages]);

  return (
    <div className="shadow-md bg-background border-y px-4 py-2 flex flex-col gap-2 max-h-[300px] w-[300px] nowheel">
      <ScrollArea className="bg-background h-[250px] w-full overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full mb-2 mr-1 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              key={m.id}
              className={`max-w-full text-sm p-2 rounded-lg ${
                m.role === "user"
                  ? "max-w-[150px] bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleChatSubmit}>
        <Label className={`${input === "" ? "block" : "hidden"}`}>
          Say something...
        </Label>
        <div className="flex items-start justify-center gap-2 mt-2">
          <Input
            className="w-full"
            value={input}
            onChange={handleInputChange}
          />
          {input && (
            <Button type="submit" className="px-2">
              Send
            </Button>
          )}
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

export default React.memo(ChatNode);
