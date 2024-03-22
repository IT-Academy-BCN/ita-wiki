import { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../../styles'
import { Icon, Input, Label, ValidationMessage } from '../../atoms'
import { useDebounce } from './useDebounce'

const SearchContainer = styled(FlexBox)`
  height: 100%;
`

const SearchBar = styled.div.withConfig<{ error: boolean }>({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 2.8rem;
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.xs};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};

  ${({ error }) => error && `border: 1px solid ${colors.error};`}
`

const IconSvg = styled.img``

const InputSearch = styled(Input)`
  border: none;
  padding: ${dimensions.spacing.none} ${dimensions.spacing.xxs};
  font-size: ${font.xs};
`

const CloseIcon = styled(Icon)`
  position: absolute;
  right: ${dimensions.spacing.xxs};
`

const ErrorMessage = styled(ValidationMessage)`
  margin-top: ${dimensions.spacing.xxxs};
  margin-bottom: ${dimensions.spacing.none};
`

export type TSearchData = {
  id: string
  value: string
}

export type TSearch = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
  searchIconName?: string
  searchSvgIcon?: string
  placeholder?: string
  searchData: TSearchData[]
  isSearchError: boolean
  errorMessage?: string
  handleSearchResults: (searchResults: TSearchData[]) => void
}

export const Search: FC<TSearch> = ({
  id,
  name,
  label,
  hiddenLabel = true,
  searchIconName,
  searchSvgIcon,
  placeholder,
  searchData,
  isSearchError = false,
  errorMessage,
  handleSearchResults,
}) => {
  const [searchValue, setSearchValue] = useState<string>('')

  const debouncedSearch = useDebounce(searchValue, 500)

  useEffect(() => {
    const handleData = () => {
      const normalizedSearch = debouncedSearch
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

      const filteredData = searchData.filter((item) =>
        item.value
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(normalizedSearch)
      )

      handleSearchResults(filteredData)
    }

    if (debouncedSearch) handleData()
  }, [searchData, debouncedSearch, handleSearchResults])

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setSearchValue(target.value)
  }

  const handleCloseSearch = () => {
    setSearchValue('')
  }

  return (
    <SearchContainer align="start" data-testid="search-container-test">
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <SearchBar error={isSearchError} data-testid="search-bar-test">
        {searchIconName && (
          <Icon name={searchIconName} color={colors.gray.gray4} />
        )}
        {searchSvgIcon && <IconSvg src={searchSvgIcon} alt="searchIcon" />}
        <InputSearch
          data-testid="input-search-test"
          id={id}
          name={name}
          value={searchValue ?? ''}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus
        />
        {searchValue !== '' && (
          <CloseIcon
            name="close"
            onClick={handleCloseSearch}
            color={colors.gray.gray4}
          />
        )}
      </SearchBar>
      {isSearchError && <ErrorMessage text={errorMessage} color="error" />}
    </SearchContainer>
  )
}
