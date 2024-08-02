import { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@/components/ui/checkbox";

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "ui/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: "boolean" },
      description:
        "When `true`, prevents the user from interacting with the checkbox.",
      defaultValue: { summary: false },
    },
    required: {
      options: [true, false],
      control: { type: "boolean" },
      description:
        "When `true`, indicates that the user must check the checkbox before the owning form can be submitted.",
      defaultValue: { summary: false },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="items-top flex space-x-2">
      <Checkbox {...args} id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="terms2" />
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};
