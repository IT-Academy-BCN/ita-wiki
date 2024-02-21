import type { Meta, StoryObj } from '@storybook/react'
import { FC, useState } from 'react'
import { Tooltip } from '../../components/molecules'
import { Button, Icon, Text } from '../../components/atoms'
import { FlexBox } from '../../styles'

type TTooltipForDocs = {
  btnText?: string
  children: React.ReactNode
  $size: 'small' | 'medium' | 'big'
  $tipPosition: 'top' | 'bottom' | 'left' | 'right'
  surroundTxt?: string
  tooltipTxt: string
  $dottedUnderline?: boolean
}

const lorem =
  ' Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. '

const MockedTooltip: FC<TTooltipForDocs> = ({
  btnText,
  children,
  $size,
  surroundTxt,
  $tipPosition,
  tooltipTxt,
  $dottedUnderline = false,
}) => {
  const [btnClicked, setBtnClicked] = useState(false)

  return (
    <FlexBox style={{ maxWidth: '20rem' }}>
      {btnClicked ? (
        <>
          <Text>You clicked the button!</Text>
          <Button size="small" onClick={() => setBtnClicked(false)}>
            Restart
          </Button>
        </>
      ) : (
        <Text as="span">
          {surroundTxt}
          <Tooltip
            btnText={btnText}
            btnOnClick={() => setBtnClicked(true)}
            $size={$size}
            $tipPosition={$tipPosition}
            tooltipTxt={tooltipTxt}
            $dottedUnderline={$dottedUnderline}
          >
            {children}
          </Tooltip>
          {surroundTxt}
        </Text>
      )}
    </FlexBox>
  )
}

const meta = {
  title: 'Molecules/Tooltip',
  component: MockedTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    btnText: { control: 'text' },
    children: { control: 'object' },
    $dottedUnderline: { control: 'boolean' },
    $size: {
      control: 'select',
      options: ['small', 'medium', 'big'],
    },
    surroundTxt: { control: 'text' },
    $tipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    tooltipTxt: { control: 'text' },
  },
  args: {
    btnText: 'Learn More',
    children: <Text style={{ margin: 0 }}>Hover me</Text>,
  },
} satisfies Meta<typeof MockedTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    $size: 'small',
    $tipPosition: 'left',
    tooltipTxt: 'Example Tooltip',
  },
}

export const Medium: Story = {
  args: {
    $size: 'medium',
    $tipPosition: 'right',
    tooltipTxt: 'Hi, there',
    $dottedUnderline: true,
  },
}

export const BigWithButton: Story = {
  args: {
    $size: 'big',
    $tipPosition: 'top',
    tooltipTxt: 'Variable are for remembering something for later',
  },
}

export const ForAnIcon: Story = {
  args: {
    children: (
      <FlexBox>
        <Icon name="help" fill={0}>
          help
        </Icon>
      </FlexBox>
    ),
    $size: 'medium',
    $tipPosition: 'bottom',
    tooltipTxt: 'Icon with Tooltip',
  },
}

export const Highlighted: Story = {
  args: {
    $dottedUnderline: true,
    $size: 'big',
    surroundTxt: lorem,
    $tipPosition: 'bottom',
    tooltipTxt: 'Variable are for remembering something for later.',
  },
}
