import { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "@/components/ui/calendar";

/**
 * A date field component that allows users to enter and edit date.
 */
const meta = {
  title: "ui/Calendar",
  component: Calendar,
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: "boolean" },
      description:
        "When `true`, prevents the user from interacting with the calendar.",
      defaultValue: { summary: false },
    },
    mode: {
      options: ["single", "range"],
      control: { type: "radio" },
      description: "The selection mode of the calendar.",
      defaultValue: { summary: "single" },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: "single",
  },
  render: (args) => <Calendar {...args} className="rounded-md border" />,
};
