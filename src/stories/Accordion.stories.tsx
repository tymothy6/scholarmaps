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
    argTypes: {
        asChild: {
            defaultValue: { summary: false },
        },
        type: {
            options: ['single', 'multiple'],
            control: { type: 'radio' },
            description: 'Determines whether one or multiple items can be opened at the same time.',
        },
        collapsible: {
            options: [true, false],
            control: { type: 'boolean' },
            description: 'When `type` is `"single"`, allows closing content when clicking trigger for an open item.',
            defaultValue: { summary: false },
        },
        defaultValue: {
            description: 'The value of the item to expand when initially rendered. Use when you do not need to control the state of the items.',
        },
        orientation: {
            options: ['vertical', 'horizontal'],
            control: { type: 'radio' },
            description: 'The orientation of the accordion.',
            defaultValue: { summary: 'vertical' },
        },
        disabled: {
            options: [true, false],
            control: { type: 'boolean' },
            description: 'When `true`, prevents the user from interacting with the accordion and all its items.',
            defaultValue: { summary: false },
        },
    },
} satisfies Meta<typeof Accordion>

export default meta;

type Story = StoryObj<typeof meta>

export const Single = {
    args: {
        type: "single",
        collapsible: false,
        defaultValue: "item-1",
    },
    render: (args) => (
        <Accordion {...args} className="w-[450px]">
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
        <Accordion {...args} className="w-[450px]">
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

export const HorizontalSingle = {
    args: {
        type: "single",
        collapsible: false,
        defaultValue: "item-1",
        orientation: "horizontal",
    },
    render: (args) => (
        <Accordion {...args} className="w-[450px]">
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