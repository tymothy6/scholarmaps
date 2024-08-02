import { Meta, StoryObj } from "@storybook/react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

/**
 * Displays a menu to the user — such as a set of actions or functions — triggered by a button.
 */
const meta = {
  title: "ui/ContextMenu",
  component: ContextMenu,
  argTypes: {
    modal: {
      options: [true, false],
      control: { type: "boolean" },
      description:
        "The modality of the context menu. When set to `true`, interaction with outside elements will be disabled and only menu content will be visible to screen readers.",
      defaultValue: { summary: true },
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-slate-200 text-sm dark:border-slate-700">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
