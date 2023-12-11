import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const meta = {
    title: 'ui/Avatar',
    component: Avatar,
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
