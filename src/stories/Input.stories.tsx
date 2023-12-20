import { Meta, StoryObj } from "@storybook/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta = {
  title: "ui/Input",
  component: Input,
  argTypes: {
        type: {
            options: ["text", "email", "password", "file"],
            control: { type: "radio" },
            description: "The type of the input field.",
        },
            placeholder: {
            control: { type: "text" },
            description: "The placeholder of the input field.",
        },
            disabled: {
            control: { type: "boolean" },
            description: "When `true`, prevents the user from interacting with the input field.",
            defaultValue: { summary: false },
        },
    },
} satisfies Meta<typeof Input>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Input {...args} />,
  args: {
    type: "email",
    placeholder: "Email",
  },
}
export const Disabled: Story = {
  render: (args) => <Input disabled {...args} />,
  args: { ...Default.args },
}
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{args.placeholder}</Label>
      <Input {...args} id="email" />
    </div>
  ),
  args: { ...Default.args },
}
export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">{args.placeholder}</Label>
      <Input {...args} id="email-2" />
      <p className="text-sm text-slate-500">Enter your email address.</p>
    </div>
  ),
  args: { ...Default.args },
}
export const WithButton: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
  args: { ...Default.args },
}
export const Password: Story = {
    render: (args) => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input {...args} id="password" />
        </div>
    ),
    args: { 
        type: "password",
    },
}
export const File: Story = {
    render: (args) => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input {...args} id="picture" />
        </div>
    ),
    args: { 
        type: "file",
    },
}