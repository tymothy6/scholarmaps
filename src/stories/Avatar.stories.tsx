import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
* An image element with a fallback for representing the user.
*/
const meta = {
    title: 'ui/Avatar',
    component: Avatar,
    argTypes: {
        asChild: {
            defaultValue: { summary: false },
        }
    },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>

export const Default = {
    render: (args) => (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
    args: {},
} satisfies Story;

export const Fallback = {
    render: (args) => (
        <Avatar>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
    args: {},
} satisfies Story;

export const WithTooltip = {
    render: (args) => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                    <p>@shadcn</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      ),
    args: {},
} satisfies Story;