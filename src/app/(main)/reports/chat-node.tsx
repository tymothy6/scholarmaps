"use client"
 
import * as React from "react";

import { Handle, Position } from "reactflow";

import { useChat } from "ai/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon } from "lucide-react";

function ChatNode() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
   
    return (
      <div className="shadow-md bg-background border-y px-4 py-2 flex flex-col gap-2 max-h-[300px] w-[300px] nowheel">
        <ScrollArea className="bg-background h-[250px] w-full overflow-y-auto">
        {messages.map(m => (
        <div 
            key={m.id} 
            className={`flex w-full mb-2 mr-1 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
        >
          <div 
            key={m.id} 
            className={`max-w-full text-sm p-2 rounded-lg ${
                m.role === 'user' ? 'max-w-[150px] bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
            }`}
          >
            {m.content}
          </div>
        </div>
        ))}
        </ScrollArea>
        <form onSubmit={handleSubmit}>
          <Label>
            Say something...
          </Label>
          <div className="flex items-start justify-center gap-2 mt-1">
            <Input
              className="w-full"
              value={input}
              onChange={handleInputChange}
            />
        {input && (
          <Button type="submit" size="icon">
            <SendIcon className="h-4 w-4" />
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