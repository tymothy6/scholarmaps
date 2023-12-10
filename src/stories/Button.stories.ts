import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

import { FontBoldIcon } from '@radix-ui/react-icons';

const meta: Meta<typeof Button> = {
  title: 'shadcn/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
};

export const secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
  },
};

export const outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
  },
};

export const ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
  },
};

export const link: Story = {
  args: {
    variant: 'link',
    size: 'default',
  },
};

export const destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
  },
};

export const icon: Story = {
  args: {
    variant: 'default',
    size: 'icon',
    children: 'B',
  },
};
