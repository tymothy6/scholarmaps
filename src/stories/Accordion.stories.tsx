import type { Meta, StoryObj } from '@storybook/react';
import { 
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
 } from '@/components/ui/accordion';

const meta = {
    title: 'ui/Accordion',
    component: Accordion,
} satisfies Meta<typeof Accordion>

export default meta;

type Story = StoryObj<typeof meta>

export const Single = {
    args: {
        type: "single",
        collapsible: true,
        defaultValue: "item-1",
    },
    render: (args) => (
        <Accordion {...args}>
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                Yes. It comes with default styles that matches the other components'
                aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
} satisfies Story;

export const Multiple = {
    args: {
        type: "multiple",
        defaultValue: ["item-1", "item-2"],
    },
    render: (args) => (
        <Accordion {...args}>
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                Yes. It comes with default styles that matches the other components'
                aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
} satisfies Story;