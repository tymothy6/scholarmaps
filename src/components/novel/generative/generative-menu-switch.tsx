import { EditorBubble, useEditor } from "novel";
import React, { Fragment, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AISelector } from "./ai-selector";
import { SparklesIcon } from "lucide-react";
import {} from "../plugins";
import { removeAIHighlight } from "../extensions/ai-highlight";

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open) removeAIHighlight(editor!);
  }, [open, editor]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          editor?.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <Button
            className="gap-1 rounded-none text-sm text-purple-500 border-r"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <SparklesIcon className="h-4 w-4" />
            Ask AI
            <span className="ml-1 px-1 py-[1px] border rounded bg-muted text-[0.65rem] font-[300] tracking-widest text-muted-foreground ">
              ⌘J
            </span>
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
