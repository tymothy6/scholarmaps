import { Meta, StoryObj } from "@storybook/react";

import { LineChartCard } from "@/components/patterns/chart-card";

const meta = {
  title: "patterns/LineChartCard",
  component: LineChartCard,
  argTypes: {},
} satisfies Meta<typeof LineChartCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <LineChartCard />,
  args: {},
};
