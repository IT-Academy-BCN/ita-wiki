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
    searchData: [
      {
        id: { control: 'text' },
        value: { control: 'text' },
      },
    ],
    handleSearchResults: { control: 'action' },
  },
} satisfies Meta<typeof Search>

export default meta
type SearchStory = StoryObj<typeof Search>

const searchData = [
  { id: '1', value: 'Ona Sitgar' },
  { id: '2', value: 'Marc Bofill' },
  { id: '3', value: 'Montserrat Capdevila' },
]

export const Default: SearchStory = {
  args: {
    id: 'default',
    name: 'default',
    label: 'Default search bar',
    placeholder: 'Default search bar',
    searchData,
    handleSearchResults: () => {},
  },
}

export const WithIcon: SearchStory = {
  args: {
    id: 'withIcon',
    name: 'withIcon',
    label: 'Search bar with icon',
    searchIconName: 'search',
    placeholder: 'Search bar with icon',
    searchData,
    handleSearchResults: () => {},
  },
}

export const WithSvg: SearchStory = {
  args: {
    id: 'withSvg',
    name: 'withSvg',
    label: 'Search bar with svg',
    searchSvgIcon: searchSvg,
    placeholder: 'Search bar with svg',
    searchData,
    handleSearchResults: () => {},
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
    searchData,
    handleSearchResults: () => {},
  },
}

export const WithError: SearchStory = {
  args: {
    id: 'withError',
    name: 'withError',
    label: 'Search bar with error',
    searchIconName: 'search',
    placeholder: 'Search bar with error',
    searchData,
    isSearchError: true,
    errorMessage: 'Search error',
    handleSearchResults: () => {},
  },
}
