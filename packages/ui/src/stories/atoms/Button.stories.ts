import type { Meta, StoryObj } from '@storybook/react';

import { Button } from "../../components/atoms/Button";

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
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'normal', 'large']
    }
  },
} satisfies Meta<typeof Button>;

export default meta;
type ButtonStory = StoryObj<typeof Button>;

//ask about this template
// const Template: ButtonStory<TButton> = (args) => <Button { ...args } />

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: ButtonStory = {
  args: {
    secondary: false,
    outline: false,
    disabled: false,
  },
};

export const Secondary: ButtonStory = {
  args: {
    secondary: true,
    outline: false,
    disabled: false,
  },
};

export const Large: ButtonStory = {
  args: {
    size: 'large',
  },
};

export const Small: ButtonStory = {
  args: {
    size: 'small',
  },
};



