import type { Meta, StoryObj } from '@storybook/react';

import { BackButton } from "../../components/atoms/BackButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/BackButton',
    component: BackButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        onClick: { action: 'handlePrevPage' },
        children: { control: 'text' },
    
    },
} satisfies Meta<typeof BackButton>;

export default meta;
type BackButtonStory = StoryObj<typeof BackButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: BackButtonStory = {
    args: {
        children: 'Volver',
    },
};






