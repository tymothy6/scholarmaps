import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  title: 'shadcn/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const primary: Story = {
  args: {
    variant: "default",
    size: "default",
  },
};