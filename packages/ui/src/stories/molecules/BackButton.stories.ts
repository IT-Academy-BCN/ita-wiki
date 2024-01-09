import type { Meta, StoryObj } from '@storybook/react';
import { BackButton } from "../../components/molecules/BackButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Molecules/BackButton',
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
        children: { control: "text" }
    },

} satisfies Meta<typeof BackButton>;

export default meta;
type BackButtonStory = StoryObj<typeof BackButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: BackButtonStory = {

    args: {

        children: 'torna'
    },
    decorators: []

};
export const IconArrow = {
    args: {
        name: 'arrow_back_ios',
        fill: 1,
        $wght: 700,
        childre: ''
    },
}








