import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  HTMLAttributes,
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
  width: 200px;

  &:hover {
    color: ${colors.white};
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: ${dimensions.spacing.base};
  right: ${dimensions.spacing.xxs};
  color: ${colors.gray.gray3};
`

const DropdownList = styled.div`
  position: absolute;
  background-color: ${colors.white};
  width: 100%;
  border-radius: ${dimensions.borderRadius.base};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
`

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-family: ${font.fontFamily};
  font-size: ${font.xss};
`

export type TDropdown = HTMLAttributes<HTMLElement> & {
  placeholder?: string
  defaultValue?: string
}

export const Dropdown = forwardRef<HTMLDivElement, TDropdown>(
  ({ defaultValue = '', placeholder = 'Selecciona', children }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    const dropdownListRef = useRef<HTMLDivElement>(null)

    const handleSelect = (value: string) => {
      setSelectedValue(value)
      setIsDropdownOpen(false)
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!dropdownListRef.current?.contains(event.target as Node)) {
          setIsDropdownOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        const value = target.innerText
        if (dropdownListRef.current?.contains(target)) {
          handleSelect(value)
        }
      }

      if (dropdownListRef.current) {
        const currentRef = dropdownListRef.current
        currentRef.addEventListener('click', handleClick)

        return () => {
          currentRef.removeEventListener('click', handleClick)
        }
      }
      return () => {}
    })

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
                title="Cerrar"
              />
            ) : (
              <StyledIcon
                name="expand_more"
                aria-hidden="true"
                title="Ampliar"
              />
            )}
          </DropdownHeader>
          {isDropdownOpen && (
            <DropdownList ref={dropdownListRef}>
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return <DropdownItem>{child}</DropdownItem>
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