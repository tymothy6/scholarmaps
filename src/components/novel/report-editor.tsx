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
 } from "./headless/index"; 
import { defaultEditorContent } from "./content";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";
import { handleCommandNavigation, type SuggestionItem } from "./extensions/slash-command";
import { ImageResizer } from "./extensions/index";

import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";
import { TextButtons } from "./selectors/text-buttons";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";

import { handleImageDrop, handleImagePaste } from "./plugins";
import { uploadFn } from "./image-upload";

// import { useSession } from "next-auth/react"; // use server-side session instead
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const extensions = [ ...defaultExtensions, slashCommand ];

const NovelReportsEditor = () => {
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const queryClient = useQueryClient();

  // Query functions
  const fetchInitialContent = async () => {
    try {
      const response = await fetch("/api/novel/load", {
        method: "GET",
        headers: { 
          "route": window.location.pathname, // include the current route
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Failed to fetch content:', error);
      throw error;
    }
  };

  const saveContent = async (content: JSONContent) => {
    try {
      const response = await fetch("/api/novel/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          content,
          route: window.location.pathname, // include the current route
         }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to save content:', error);
      throw error;
    }
  }

  const { data: initialContent, isLoading, isError } = useQuery({
    queryKey: ['editorContent'],
    queryFn: fetchInitialContent,
  });

  const { mutate: saveContentMutation } = useMutation({
    mutationFn: saveContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['editorContent'] });
      setSaveStatus("Saved");
    },
    onError: () => {
      setSaveStatus("Unsaved");
      toast.error('Failed to save your notes. Please try again later 🥹');
    },
  });

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      saveContentMutation(json);
    },
    500,
  );

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load your notes. Please try again later 🥹');
    }
  }, [isError]);

  if (isLoading) { 
    return (
      <div className="w-full h-max p-8 flex flex-col gap-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  return (
    <div className="relative w-full">
    <div className="absolute top-4 right-4 w-max z-10 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
      {saveStatus}
    </div>
    <EditorRoot>
    <ScrollArea className="h-[67vh] w-full">
      <EditorContent
        initialContent={initialContent || defaultEditorContent} // if api/novel/load returns null show default content
        extensions={extensions}
        className="relative w-full bg-background"
        onUpdate={({ editor }) => {
          debouncedUpdates(editor);
          setSaveStatus("Unsaved");
        }}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => 
            handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-slate prose-lg dark:prose-invert prose-headings:font-title prose-headings:text-foreground font-default focus:outline-none max-w-full`,
          }
        }}
        slotAfter={<ImageResizer />}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item: SuggestionItem) => ( 
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command && item.command(val)} // check if command exists first 
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <TextButtons />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
      </EditorContent>
    </ScrollArea>
    </EditorRoot>
  </div>
  );
};
export default NovelReportsEditor;
