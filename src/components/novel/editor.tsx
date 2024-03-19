"use client";

import React, { useState, useEffect } from "react";
import { 
  EditorContent, 
  EditorRoot, 
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
  EditorInstance, 
  type JSONContent,
 } from "novel";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";
import { handleCommandNavigation } from "./extensions/slash-command";

import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";
import { TextButtons } from "./selectors/text-buttons";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";

import { Separator } from "@/components/ui/separator";

const extensions = [ ...defaultExtensions, slashCommand ];

const NovelTailwindEditor = () => {
  const [initialContent, setInitialContent] = useState<JSONContent | null>(null);
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();

      window.localStorage.setItem("novel-content", JSON.stringify(json));
      setSaveStatus("Saved");
    },
    500,
  );

  // Add useEffect hook to load initial content here

  return (
    <EditorRoot>
      <EditorContent
        initialContent={initialContent || undefined}
        extensions={extensions}
        className="relative min-h-[500px] w-full border-muted bg-background sm:rounded-lg sm:border sm:shadow"
        onUpdate={({ editor }) => {
          debouncedUpdates(editor);
          setSaveStatus("Unsaved");
        }}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          }
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item: any) => ( // should type 
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
            
          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
      </EditorContent>
    </EditorRoot>
  );
};
export default NovelTailwindEditor;
