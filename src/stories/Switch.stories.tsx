import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const meta = {
    title: 'ui/Switch',
    component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof Switch>

export const Default = {
    render: (args) => (
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      ),
    args: {},
} satisfies Story;
