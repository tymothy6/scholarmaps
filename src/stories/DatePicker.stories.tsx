import { Meta, StoryObj } from "@storybook/react";

import {
  DatePicker,
  DatePickerWithRange,
  DatePickerWithPresets,
} from "@/components/patterns/date-picker";

/**
 * A date picker component with range and presets.
 */
const meta = {
  title: "ui/DatePicker",
  component: DatePicker,
  argTypes: {},
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DatePicker {...args} />,
};

export const WithRange: Story = {
  render: (args) => <DatePickerWithRange {...args} />,
};

export const WithPresets: Story = {
  render: (args) => <DatePickerWithPresets {...args} />,
};
