import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest';
// import { withActions } from '@storybook/addon-actions/decorator';
import { action } from '@storybook/addon-actions';
import { BackButton } from "../../components/atoms/BackButton";
// import { Icon } from "../../components/atoms/Icon";
// import { IconStory } from "./Icon.stories";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/BackButton',
    component: BackButton,
    // render: ({ Icon, ...args }) => (
    //     <BackButton>{< Icon />} < /BackButton >)

    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
        // actions: {
        //     handles: ['click .btn'],
        // },
    },

    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        onClick: { action: 'handlePrevPage' },
        children: { control: "text", defaultValue: 'Torna' }
    },
    // decorators: [

    //     withActions
    // ],
} satisfies Meta<typeof BackButton>;

export default meta;
type BackButtonStory = StoryObj<typeof BackButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: BackButtonStory = {


    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const GetBackButton = canvas.getByRole('button');

        await userEvent.click(GetBackButton);
        await expect(
            canvas.getByText(
                'Torna',
            )
        ).toBeInTheDocument();

    },

    args: {

        onClick: action('handlePrevPage'),
        children: 'Torna'
    },
    decorators: []

};
export const IconArrow = {
    args: {
        name: 'arrow_back_ios',
        fill: 1,
        $wght: 700,

    },
}








