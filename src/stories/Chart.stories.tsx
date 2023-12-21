import { Meta, StoryObj } from "@storybook/react"

import { CardsMetric } from "@/components/patterns/chart-card"

const meta = { 
    title: "patterns/CardsMetric",
    component: CardsMetric,
    argTypes: {},
} satisfies Meta<typeof CardsMetric>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: (args) => (
        <CardsMetric />
    ),
    args: {},
}