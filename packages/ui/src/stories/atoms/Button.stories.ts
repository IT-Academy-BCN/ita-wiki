import type { Meta, StoryObj } from '@storybook/react';

import Button from "../../components/atoms/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' },
    children: { control: 'text' },
    secondary: { control: 'boolean' },
    outline: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'normal', 'large']
    }
  },
} satisfies Meta<typeof Button>;

export default meta;
type ButtonStory = StoryObj<typeof Button>;

// const Template: ButtonStory<TButton> = (args) => <Button { ...args } />

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: ButtonStory = {
  args: {
    label: 'Button',
    secondary: false,
    outline: false
  },
};

export const Secondary: ButtonStory = {
  args: {
    label: 'Secundary Button',
    secondary: true,
    outline: false
  },
};

export const Large: ButtonStory = {
  args: {
    size: 'large',
    label: 'large Button',
  },
};

export const Small: ButtonStory = {
  args: {
    size: 'small',
    label: 'small Button',
  },
};



