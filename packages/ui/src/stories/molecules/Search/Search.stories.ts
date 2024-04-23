import type { Meta, StoryObj } from '@storybook/react'
import { Search } from '../../../components/molecules'
import searchSvg from './search.svg'

const meta = {
  title: 'Molecules/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    hiddenLabel: { control: 'boolean' },
    searchIconName: { control: 'text' },
    searchSvgIcon: { control: 'text' },
    placeholder: { control: 'text' },
    isSearchError: { control: 'boolean' },
    errorMessage: { control: 'text' },
    handleSearchValue: { control: 'action' },
  },
} satisfies Meta<typeof Search>

export default meta
type SearchStory = StoryObj<typeof Search>

export const Default: SearchStory = {
  args: {
    id: 'default',
    name: 'default',
    label: 'Default search bar',
    placeholder: 'Default search bar',
    handleSearchValue: () => {},
  },
}

export const WithIcon: SearchStory = {
  args: {
    id: 'withIcon',
    name: 'withIcon',
    label: 'Search bar with icon',
    searchIconName: 'search',
    placeholder: 'Search bar with icon',
    handleSearchValue: () => {},
  },
}

export const WithSvg: SearchStory = {
  args: {
    id: 'withSvg',
    name: 'withSvg',
    label: 'Search bar with svg',
    searchSvgIcon: searchSvg,
    placeholder: 'Search bar with svg',
    handleSearchValue: () => {},
  },
}

export const WithLabel: SearchStory = {
  args: {
    id: 'withLabel',
    name: 'withLabel',
    label: 'Search bar with label',
    hiddenLabel: false,
    searchIconName: 'search',
    placeholder: 'Search bar with label',
    handleSearchValue: () => {},
  },
}

export const WithError: SearchStory = {
  args: {
    id: 'withError',
    name: 'withError',
    label: 'Search bar with error',
    searchIconName: 'search',
    placeholder: 'Search bar with error',
    isSearchError: true,
    errorMessage: 'Search error',
    handleSearchValue: () => {},
  },
}
