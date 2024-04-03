import React from "react";
import { useCommandState } from "cmdk";
import { CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowDownWideNarrow,
  CheckCheck,
  RefreshCcwDot,
  StepForward,
  WrapText,
  Sparkles,
  Ear,
  ChevronUp,
  Quote,
  FileQuestion,
  List,
  Pen,
} from "lucide-react";
import { useEditor } from "novel";
import { getPrevText } from "../extensions/index";

const options = [
  {
    value: "improve",
    label: "Improve writing",
    icon: RefreshCcwDot,
  },

  {
    value: "fix",
    label: "Fix grammar",
    icon: CheckCheck,
  },
  {
    value: "shorter",
    label: "Make shorter",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "Make longer",
    icon: WrapText,
  },
  {
    value: "simplify",
    label: "Simplify language",
    icon: Sparkles,
  },
  {
    value: "tone",
    label: "Change tone",
    icon: Ear,
  },
];

const toneOptions = [
    {
      value: "professional",
      label: "Professional",
    },
    {
      value: "casual",
      label: "Casual",
    },
    {
      value: "straightforward",
      label: "Straightforward",
    },
    {
      value: "confident",
      label: "Confident",
    },
    {
      value: "friendly",
      label: "Friendly",
    },
];

const writeOptions = [
  {
    value: "brainstorm",
    label: "Brainstorm ideas...",
    icon: Pen,
  },
  {
    value: "outline",
    label: "Create an outline...",
    icon: Pen,
  },
  {
    value: "todo",
    label: "Create a to-do list...",
    icon: Pen,
  },
  {
    value: "pros",
    label: "List pros & cons...",
    icon: Pen,
  },
]

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();
  const state = useCommandState((state) => state);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  const handleSelection = (value: string) => {
    if (value === "tone") {
      setSelectedOption("tone");
    } else {
      setSelectedOption(null);
      if (editor) {
        const slice = editor.state.selection.content();
        const text = editor.storage.markdown.serializer.serialize(
          slice.content,
        );
        onSelect(text, value);
      }
    };
  };

  const handleNavigationBack = () => {
    setSelectedOption(null);
  };

  const hasItems = state.search.length === 0 || state.filtered.count > 0; // When search is empty, hide the menu

  return (
    <>
    {hasItems && (
    <ScrollArea className="h-[150px] lg:h-[250px] border-t">
      <CommandGroup heading="Edit or review selection">
      {selectedOption !== "tone" && (
          <>
            {options.map((option) => (
              <CommandItem
                onSelect={() => handleSelection(option.value)}
                className="flex gap-2 px-4"
                key={option.value}
                value={option.value}
              >
                <div className="flex items-center gap-2">
                  <option.icon className="h-4 w-4 text-purple-500" />
                  {option.label}
                </div>
              </CommandItem>
            ))}
          </>
        )}
        {selectedOption === "tone" && (
            <>
              <CommandItem
                onSelect={handleNavigationBack}
                className="flex items-center justify-between px-4"
                value="tone"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Ear className="h-4 w-4 text-purple-500" />
                    Change tone
                  </div>
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </CommandItem>
                {toneOptions.map((option) => (
                  <CommandItem
                    onSelect={() => {
                      if (editor) {
                        const slice = editor.state.selection.content();
                        const text = editor.storage.markdown.serializer.serialize(slice.content);
                        onSelect(text, `tone.${option.value}`);
                      }
                    }}
                    className="flex gap-2 px-8"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </CommandItem>
                ))}
            </>
        )}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Generate from selection">
        <CommandItem
          onSelect={() => {
            if (editor) {
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content,
              );
              onSelect(text, "summarize");
            }
          }}
          className="gap-2 px-4"
          value="summarize"
        >
          <Quote className="h-4 w-4 text-purple-500" />
          Summarize
        </CommandItem>
        <CommandItem
          onSelect={() => {
            if (editor) {
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content,
              );
              onSelect(text, "explain");
            }
          }}
          className="gap-2 px-4"
          value="explain"
        >
          <FileQuestion className="h-4 w-4 text-purple-500" />
          Explain this
        </CommandItem>
        <CommandItem
          onSelect={() => {
            if (editor) {
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content,
              );
              onSelect(text, "action");
            }
          }}
          className="gap-2 px-4"
          value="action"
        >
          <List className="h-4 w-4 text-purple-500" />
          Find action items
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandItem
          onSelect={() => {
            if (editor) {
              const text = getPrevText(editor, { chars: 5000 });
              onSelect(text, "continue");
            }
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="h-4 w-4 text-purple-500" />
          Continue writing
        </CommandItem>
        {writeOptions.map((option) => (
              <CommandItem
              onSelect={() => {
                if (editor) {
                  const slice = editor.state.selection.content();
                  const text = editor.storage.markdown.serializer.serialize(slice.content);
                  onSelect(text, `write.${option.value}`);
                }
              }}
                className="flex gap-2 px-4"
                key={option.value}
                value={option.value}
              >
                <div className="flex items-center gap-2">
                  <option.icon className="h-4 w-4 text-purple-500" />
                  {option.label}
                </div>
              </CommandItem>
        ))}
      </CommandGroup>
    </ScrollArea>
    )}
    </>
  );
};

export default AISelectorCommands;