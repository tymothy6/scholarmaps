import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "@/components/ui/button";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Loader2, Mail } from "lucide-react";

/**
 * Displays a button or a component that looks like a button.
 */
const meta = {
  title: "ui/Button",
  component: Button,
  argTypes: {
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: { type: "select" },
      description: "The variant of the button.",
      defaultValue: { summary: "default" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "radio" },
      description: "The size of the button.",
      defaultValue: { summary: "default" },
    },
    disabled: {
      options: [true, false],
      control: { type: "boolean" },
      description: "Whether the button is disabled.",
      defaultValue: { summary: false },
    },
    // asChild: {
    //     table: {
    //         disable: true,
    //     },
    // },
  },
  args: {
    variant: "default",
    size: "default",
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    variant: "default",
    size: "default",
  },
  render: (args) => <Button {...args}>Button</Button>,
} satisfies Story;

export const Destructive = {
  args: {
    variant: "destructive",
    size: "default",
  },
  render: (args) => <Button {...args}>Button</Button>,
} satisfies Story;

export const Outline = {
  args: {
    variant: "outline",
    size: "default",
  },
  render: (args) => <Button {...args}>Button</Button>,
} satisfies Story;

export const Secondary = {
  args: {
    variant: "secondary",
    size: "default",
  },
  render: (args) => <Button {...args}>Button</Button>,
} satisfies Story;

export const Ghost = {
  args: {
    variant: "ghost",
    size: "default",
  },
  render: (args) => <Button {...args}>Button</Button>,
} satisfies Story;

export const Link = {
  args: {
    variant: "link",
    size: "default",
  },
  render: (args) => <Button {...args}>Button</Button>,
} satisfies Story;

export const Icon = {
  args: {
    variant: "default",
    size: "icon",
  },
  render: (args) => (
    <Button {...args}>
      <GitHubLogoIcon className="h-4 w-4" />
    </Button>
  ),
} satisfies Story;

export const Loading: Story = {
  args: {
    variant: "outline",
    size: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Button
    </Button>
  ),
};

export const WithIcon: Story = {
  args: {
    variant: "secondary",
    size: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2 h-4 w-4" />
      Login with Email
    </Button>
  ),
};
