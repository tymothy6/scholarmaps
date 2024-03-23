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

import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

import { toast } from "sonner";

const extensions = [ ...defaultExtensions, slashCommand ];
const prisma = new PrismaClient();

const NovelTailwindEditor = () => {
  const [initialContent, setInitialContent] = useState<JSONContent | null>(null);
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const session = useSession();
  const userId = session.data?.user?.id;

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      
      if (userId) {
        try {
          await prisma.novelEditorHistory.upsert({
            where: { id: userId },
            update: { 
              content: json,
              updatedAt: new Date(),
            },
            create: {
              userId,
              content: json,
            },
          });
          
          setSaveStatus("Saved");
        } catch (error) {
          console.error("Failed to save content: ", error);
          setSaveStatus("Unsaved");
        }
      } else {
        console.warn("User not authenticated. Content will not be saved.");
        setSaveStatus("Unsaved");
      }
    },
    500,
  );

  // Load initial content from database or set default
  useEffect(() => {
    const fetchInitialContent = async () => {
      if (userId) {
        try {
          const history = await prisma.novelEditorHistory.findUnique({
            where: { id: userId },
          });

          if (history) {
            setInitialContent(history.content as JSONContent);
          } else {
            setInitialContent(defaultEditorContent);
            toast.info('No saved content found. Start editing to save.');
          }
        } catch (error) {
          console.error("Failed to fetch content: ", error);
          setInitialContent(defaultEditorContent);
          toast.error('Failed to load your saved notes 🥹');
        }
      } else {
        const content = window.localStorage.getItem("novel-content");
        if (content) {
          setInitialContent(JSON.parse(content)); // content is a string in local storage
        } else {
          setInitialContent(defaultEditorContent);
          toast.info('Default content loaded. Sign in to save your notes.');
        }
      }
    };

      fetchInitialContent();
  }, [userId]);

  // Default content loading from local storage
  // useEffect(() => {
  //   const content = window.localStorage.getItem("novel-content");

  //   if (content) {
  //     setInitialContent(JSON.parse(content));
  //   } else {
  //     console.log("Default content loaded: ", defaultEditorContent)
  //   } setInitialContent(defaultEditorContent);
  // }, []);

  if (!initialContent) return null; // wait for initial content to load

  return (
    <div className="relative w-full">
    <div className="absolute top-4 right-4 w-max z-10 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
      {saveStatus}
    </div>
    <EditorRoot>
      <EditorContent
        initialContent={initialContent || undefined}
        extensions={extensions}
        className="relative min-h-[500px] w-full border bg-background sm:rounded-lg sm:border sm:shadow"
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
    </EditorRoot>
  </div>
  );
};
export default NovelTailwindEditor;
