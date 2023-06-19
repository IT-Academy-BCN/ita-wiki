import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import Button from './Button'
import { colors, dimensions, font } from '../../styles'

const StyledDropdown = styled.div<TDropdown>`
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
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: ${dimensions.spacing.base};
  right: ${dimensions.spacing.xxs};
  color: ${colors.gray.gray3};
`

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleClickOutside)
    }
  }, [callback])

  return ref
}

type TDropdown = HTMLAttributes<HTMLElement> & {
  selectedValue?: string
  placeholder?: string
}

const Dropdown = forwardRef(
  (
    { selectedValue = '', placeholder = 'Selecciona', children }: TDropdown,
    dropdownRef
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    const ref = useOutsideClick(() => {
      setIsDropdownOpen(false)
    })

    useImperativeHandle(
      dropdownRef,
      () => ({
        getValue: () => selectedValue,
      }),
      [selectedValue]
    )

    return (
      <div ref={ref}>
        <StyledDropdown data-testid="dropdown">
          <DropdownHeader
            type="button"
            data-testid="dropdown-header"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedValue !== '' ? selectedValue : placeholder}</span>
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
          {isDropdownOpen && children}
        </StyledDropdown>
      </div>
    )
  }
)

export default styled(Dropdown)``
