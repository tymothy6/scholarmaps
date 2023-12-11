import Image from 'next/image';
import { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

const meta = {
    title: 'ui/AspectRatio',
    component: AspectRatio,
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof AspectRatio>

export const Default = {
    args: {
        ratio: 16 / 9,
    },
    render: (args) => (
        <div className="w-[450px]">
            <AspectRatio ratio={16 / 9} className="bg-slate-50 dark:bg-slate-800">
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

export const FourToThree = {
    args: {
        ratio: 4 / 3,
    },
    render: (args) => (
        <div className="w-[450px]">
            <AspectRatio ratio={4 / 3} className="bg-slate-50 dark:bg-slate-800">
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

export const ThreeToTwo = {
    args: {
        ratio: 3 / 2,
    },
    render: (args) => (
        <div className="w-[450px]">
            <AspectRatio ratio={3 / 2} className="bg-slate-50 dark:bg-slate-800">
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