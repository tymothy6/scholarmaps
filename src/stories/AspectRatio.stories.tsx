import Image from 'next/image';
import { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

/**
 * Displays content within a desired ratio.
 */
const meta = {
    title: 'ui/AspectRatio',
    component: AspectRatio,
    argTypes: {
        ratio: {
            control: { type: 'number' },
            description: 'The ratio of the content specified as a number.',
            defaultValue: { summary: '1' },
        },
        asChild: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof AspectRatio>

export const Default = {
    render: (args) => (
        <div className="w-[450px]">
            <AspectRatio {...args} className="bg-slate-50 dark:bg-slate-800">
                <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Photo by Drew Beamer"
                fill
                className="rounded-md object-cover"
                />
            </AspectRatio>
        </div>
    ),
} satisfies Story;