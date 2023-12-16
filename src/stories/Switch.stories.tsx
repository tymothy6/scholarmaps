import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';


/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
    title: 'ui/Switch',
    component: Switch,
    argTypes: {
      asChild: {
          table: {
              disable: true,
          },
      },
      checked: {
          options: [true, false],
          control: { type: 'boolean' },
          description: 'The controlled state of the switch. Must be used in conjunction with `onCheckedChange`.',
      },
      onCheckedChange: {
          action: 'onCheckedChange',
          description: 'Event handler called when the state of the switch changes.',
      },
      defaultChecked: {
          options: [true, false],
          control: { type: 'boolean' },
          description: 'The state of the switch when it is initially rendered. Use when you do not need to control its state.',
      },
      disabled: {
          options: [true, false],
          control: { type: 'boolean' },
          description: 'When true, prevents the user from interacting with the switch.',
          defaultValue: { summary: false },
      },
      required: {
          control: { type: 'boolean' },
          description: 'When true, indicates that the user must check the switch before the owning form can be submitted.',
      }
    }

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
