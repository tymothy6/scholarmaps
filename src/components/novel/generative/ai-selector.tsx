"use client";

import { Command, CommandInput } from "@/components/ui/command";
import { 
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
 } from "@/components/ui/tooltip";

import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { useEditor } from "novel";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import AISelectorCommands from "./ai-selector-commands";
import AICompletionCommands from "./ai-completion-command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowUp, Loader, Sparkles } from "lucide-react";

import { addAIHighlight } from "../extensions/index";
import { LightningBoltIcon } from "@radix-ui/react-icons";

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ open, onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState("");

  const { completion, complete, isLoading } = useCompletion({
    // id: "novel",
    api: "/api/novel/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const hasCompletion = completion.length > 0;

  const handleCompletion = () => {
    if (completion)
    return complete(completion, {
      body: { option: "zap", command: inputValue },
    }).then(() => setInputValue(""));
  
    if (editor) {
      const slice = editor.state.selection.content();
      const text = editor.storage.markdown.serializer.serialize(
        slice.content,
      );

      complete(text, {
        body: { option: "zap", command: inputValue },
      }).then(() => setInputValue(""));
    }
  }

  return (
    <Command className="w-[375px]">
      {hasCompletion && (
        <div className="flex max-h-[200px]">
          <ScrollArea>
            <div className="prose p-2 px-4 prose-sm prose-slate">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
          <Sparkles className="mr-2 h-4 w-4 shrink-0  " />
          AI is thinking
          <div className="ml-2 mt-1">
            <Loader className="w-4 h-4 animate-spin"/>
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={
                hasCompletion
                  ? "Tell AI what to do next"
                  : "Ask AI to edit or generate..."
              }
              onFocus={() => editor && addAIHighlight(editor)}
              className="h-12"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCompletion();
                }
              }}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
                    onClick={handleCompletion}
                  >
                  { inputValue ? 
                    <LightningBoltIcon className="h-4 w-4" /> 
                    : 
                    <ArrowUp className="h-4 w-4" />
                  }
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    { inputValue ? "Zap text ↵" : "Ask AI ↵" }
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                editor?.chain().unsetHighlight().focus().run();
                onOpenChange(false);
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands
              onSelect={(value, option) =>
                complete(value, { body: { option } })
              }
            />
          )}
        </>
      )}
    </Command>
  );
}