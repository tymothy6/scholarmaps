import { Meta, StoryObj } from "@storybook/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 */
const meta = {
  title: "ui/AlertDialog",
  component: AlertDialog,
  argTypes: {
    open: {
      options: [true, false],
      control: { type: "boolean" },
      description:
        "The controlled open state of the dialog. Must be used in conjunction with `onOpenChange`.",
    },
    onOpenChange: {
      description:
        "Event handler called when the open state of the dialog changes.",
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Yes, delete account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
