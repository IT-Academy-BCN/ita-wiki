import {
  useState,
  useRef,
  forwardRef,
  useEffect,
  HTMLAttributes,
  useCallback,
  useMemo,
} from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Button } from './Button'
import { Icon } from './Icon'

const StyledDropdown = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
`

const StyledIcon = styled(Icon)`
  color: ${colors.gray.gray3};
`

const StyledImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`

export const DropdownHeader = styled(Button)`
  justify-content: space-between;
  background-color: ${colors.white};
  padding: ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};
  color: ${colors.black.black3};
  width: 320px;

  &:hover {
    transition: all 0.2s ease;
    color: ${colors.white};
    border: 1px solid;

    ${StyledIcon} {
      transition: all 0.2s ease;
      color: ${colors.white};
    }
  }
`

const DropdownList = styled.div`
  position: absolute;
  background-color: ${colors.white};
  width: 100%;
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};
  margin-top: ${dimensions.spacing.xxxs};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
`

const DropdownItem = styled.div`
  padding: 12px 10px;
  cursor: pointer;
  font-family: ${font.fontFamily};
  font-size: ${font.xs};
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};

    ${StyledIcon} {
      color: ${colors.white};
    }
  }
`

export type TDropdownOption = {
  id: string
  name: string
  icon?: string
  iconSvg?: string
}

export type TDropdown = HTMLAttributes<HTMLElement> & {
  options: TDropdownOption[]
  placeholder?: string
  defaultSelectedOption?: TDropdownOption
  onValueChange?: (selectedOption: TDropdownOption) => void
  openText?: string
  closeText?: string
  className?: string
  headerClassname?: string
}

export const Dropdown = forwardRef<HTMLDivElement, TDropdown>(
  (
    {
      options = [],
      defaultSelectedOption,
      placeholder = 'Selecciona',
      onValueChange,
      openText = 'Ampliar',
      closeText = 'Cerrar',
      className = '',
    },
    ref
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<
      TDropdownOption | undefined
    >(defaultSelectedOption)
    const dropdownListRef = useRef<HTMLDivElement>(null)
    const dropdownCloseOutsideRef = useRef<HTMLDivElement>(null)

    const handleSelect = useCallback(
      (selectedOption: TDropdownOption) => {
        setSelectedValue(selectedOption)
        setIsDropdownOpen(false)
        if (onValueChange) {
          onValueChange(selectedOption)
        }

        const handleClick = (event: MouseEvent) => {
          const target = event.target as HTMLElement
          if (dropdownListRef.current?.contains(target)) {
            handleSelect(selectedOption)
          }
        }

        if (dropdownListRef.current) {
          dropdownListRef.current.addEventListener('click', handleClick)
          return () => {
            dropdownListRef.current?.removeEventListener('click', handleClick)
          }
        }
        return () => {}
      },
      [dropdownListRef, onValueChange]
    )

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!dropdownCloseOutsideRef.current?.contains(event.target as Node)) {
          setIsDropdownOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dropdownListRef, dropdownCloseOutsideRef])

    const selectedOption = useMemo(
      () => options.find((option) => option.id === selectedValue?.id),
      [options, selectedValue]
    )

    return (
      <div ref={ref} className={className}>
        <StyledDropdown data-testid="dropdown" ref={dropdownCloseOutsideRef}>
          <DropdownHeader
            data-testid="dropdown-header"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedOption ? (
              <FlexBox direction="row" key={selectedOption.id}>
                {selectedOption.icon && (
                  <StyledIcon name={selectedOption.icon} />
                )}
                {selectedOption.iconSvg && (
                  <StyledImage
                    src={selectedOption.iconSvg}
                    alt={selectedOption.name}
                    color="green"
                  />
                )}
                <span>{selectedOption.name}</span>
              </FlexBox>
            ) : (
              <span>
                {(defaultSelectedOption && (
                  <FlexBox direction="row" key={defaultSelectedOption.id}>
                    {defaultSelectedOption.icon && (
                      <StyledIcon name={defaultSelectedOption.icon} />
                    )}
                    {defaultSelectedOption.iconSvg && (
                      <StyledImage
                        src={defaultSelectedOption.iconSvg}
                        alt={defaultSelectedOption.name}
                        color="green"
                      />
                    )}
                    <span>{defaultSelectedOption.name}</span>
                  </FlexBox>
                )) ||
                  placeholder}
              </span>
            )}

            <StyledIcon
              name={isDropdownOpen ? 'expand_less' : 'expand_more'}
              aria-hidden="true"
              title={isDropdownOpen ? closeText : openText}
            />
          </DropdownHeader>
          {isDropdownOpen && (
            <DropdownList ref={dropdownListRef}>
              {options.map((option) => (
                <DropdownItem
                  key={option.id}
                  data-testid={option.id}
                  id={option.id}
                  onClick={() => handleSelect(option)}
                >
                  {option.icon && <StyledIcon name={option.icon} />}
                  {option.iconSvg && (
                    <StyledImage src={option.iconSvg} alt={option.name} />
                  )}
                  <span>{option.name}</span>
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </StyledDropdown>
      </div>
    )
  }
)
