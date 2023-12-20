import { Meta, StoryObj } from "@storybook/react";
import Input from "../../components/atoms/Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    error: { control: "boolean", defaultValue: false },
    success: { control: "boolean", defaultValue: false },
    warning: { control: "boolean", defaultValue: false },
    type: {
      control: "select",
      options: ["text", "password", "email"],
      defaultValue: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    type: "text",
  },
};

export const Error: Story = {
  args: {
    value: "invalid input",
    error: true,
  },
};

export const Success: Story = {
  args: {
    value: "valid input",
    success: true,
  },
};

export const Warning: Story = {
  args: {
    value: "warning input",
    warning: true,
  },
};

export const EmailInput: Story = {
  args: {
    value: "user@example.com",
    type: "email",
  },
};

export const PasswordInput: Story = {
  args: {
    value: "password",
    type: "password",
  },
};
