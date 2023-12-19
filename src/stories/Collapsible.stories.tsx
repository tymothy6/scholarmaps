import { Meta, StoryObj } from "@storybook/react";

import { ChevronsUpDown, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

/**
 * An interactive component which expands/collapses a panel.
 */
const meta = {
    title: "ui/Collapsible",
    component: Collapsible,
    argTypes: {
        open: {
            options: [true, false],
            control: { type: 'boolean' },
            description: 'The controlled open state of the collapsible. Must be used in conjunction with `onOpenChange`.',
        },
        onOpenChange: {
            description: 'Event handler called when the open state of the collapsible changes.'
        }
    },
} satisfies Meta<typeof Collapsible>

export default meta;

type Story = StoryObj<typeof meta>

export const Closed: Story = {
    args: {
      open: false,
      onOpenChange: () => null,
    },
    render: (args) => (
      <Collapsible {...args} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
            @radix-ui/colors
          </div>
          <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    ),
  }

  export const Open: Story = {
    args: {
      open: true,
      onOpenChange: () => null,
    },
    render: (args) => (
      <Collapsible {...args} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
            @radix-ui/colors
          </div>
          <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    ),
  }