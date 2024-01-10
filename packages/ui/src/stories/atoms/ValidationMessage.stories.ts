import type { Meta, StoryObj } from "@storybook/react";
import { ValidationMessage } from "../../components/atoms";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/ValidationMessage",
  component: ValidationMessage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    text: { control: "text" },
    color: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning']
    }
  },
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    text: "Validation Message",
    color: "success",
  },
};

export const ErrorMessage: Story = {
  args: {
    text: "Error Message",
    color: "error",
  },
};
export const WarningMessage: Story = {
  args: {
    text: "Warning Message",
    color: "warning",
  },
}