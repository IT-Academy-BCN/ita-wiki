import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  HTMLAttributes,
  useCallback,
} from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'
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

const DropdownHeader = styled(Button)`
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
  padding: 10px;
  cursor: pointer;
  font-family: ${font.fontFamily};
  font-size: ${font.xss};
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`

export type TDropdownOption = {
  id: string
  name: string
  icon?: string
}

export type TDropdown = HTMLAttributes<HTMLElement> & {
  options: TDropdownOption[]
  placeholder?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  openText?: string
  closeText?: string
}

export const Dropdown = forwardRef<HTMLDivElement, TDropdown>(
  (
    {
      options = [],
      defaultValue = '',
      placeholder = 'Selecciona',
      onValueChange,
      openText = 'Ampliar',
      closeText = 'Cerrar',
    },
    ref
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    const dropdownListRef = useRef<HTMLDivElement>(null)

    const handleSelect = useCallback(
      (value: string) => {
        setSelectedValue(value)
        setIsDropdownOpen(false)
        if (onValueChange) {
          onValueChange(value)
        }

        const handleClick = (event: MouseEvent) => {
          const target = event.target as HTMLElement
          const innerValue = target.innerText
          if (dropdownListRef.current?.contains(target)) {
            handleSelect(innerValue)
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
        if (!dropdownListRef.current?.contains(event.target as Node)) {
          setIsDropdownOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dropdownListRef])

    return (
      <div ref={ref}>
        <StyledDropdown data-testid="dropdown" ref={dropdownListRef}>
          <DropdownHeader
            data-testid="dropdown-header"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedValue && <StyledIcon name={selectedValue} />}
            <span>{selectedValue || placeholder}</span>
            <StyledIcon
              name={isDropdownOpen ? 'expand_less' : 'expand_more'}
              aria-hidden="true"
              title={isDropdownOpen ? openText : closeText}
            />
          </DropdownHeader>
          {isDropdownOpen && (
            <DropdownList>
              {options.map(({ name, id, icon }) => (
                <DropdownItem key={id} onClick={() => handleSelect(id)}>
                  {icon && <StyledIcon name={icon} />}
                  <span>{name}</span>
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </StyledDropdown>
      </div>
    )
  }
)
