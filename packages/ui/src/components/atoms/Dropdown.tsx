import React, {
  Children,
  isValidElement,
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

const DropdownHeader = styled(Button)`
  background-color: ${colors.white};
  justify-content: start;
  margin: 0;
  padding: ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};
  color: ${colors.black.black3};
  font-family: ${font.fontFamily};
  width: 320px;

  &:hover {
    color: ${colors.white};
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: ${dimensions.spacing.base};
  right: ${dimensions.spacing.xxs};
  color: ${colors.gray.gray3};
  transform: translateY(-50%);
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

const IconContainer = styled.span`
  margin-right: 8px;
`

export type TDropdown = HTMLAttributes<HTMLElement> & {
  placeholder?: string
  defaultValue?: string
  children: React.ReactNode
  onValueChange?: (value: string) => void
  openText?: string
  closeText?: string
}

export type TDropdownOption = {
  value?: string;
  icon?: string;
};

export const Dropdown = forwardRef<HTMLDivElement, TDropdown>(
  (
    {
      defaultValue = '',
      placeholder = 'Selecciona',
      children,
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
        <StyledDropdown data-testid="dropdown">
          <DropdownHeader
            data-testid="dropdown-header"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedValue || placeholder}</span>
            {isDropdownOpen ? (
              <StyledIcon
                name="expand_less"
                aria-hidden="true"
                title={closeText}
              />
            ) : (
              <StyledIcon
                name="expand_more"
                aria-hidden="true"
                title={openText}
              />
            )}
          </DropdownHeader>
          {isDropdownOpen && (
            <DropdownList ref={dropdownListRef}>
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  const { value, icon } = child.props;
                  return (
                    <DropdownItem
                      onClick={() =>
                        handleSelect(child.props.children.toString())
                      }
                    >
                      <IconContainer>{icon}</IconContainer>
                      <span>{value}</span>
                    </DropdownItem>
                  )
                }
                return null
              })}
            </DropdownList>
          )}
        </StyledDropdown>
      </div>
    )
  }
)
