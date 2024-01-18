import type { Meta, StoryObj } from "@storybook/react";

import Text from "../../components/atoms/Text";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Atoms/Text",
    component: Text,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
     
        fontWeight: { options: ['normal', 'bold'], control: { type: 'select' } },
        fontSize: { control: 'text' },
        fontFamily: {
            options: [
                'Poppins', 'system-ui', '-apple-system', "Segoe UI", "Helvetica Neue", 'Arial', "Noto Sans", "Liberation Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji",

            ], control: { type: 'select' }
        },
    }
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        label: "Text",
        children: "Lorem ipsum...",
    },
};