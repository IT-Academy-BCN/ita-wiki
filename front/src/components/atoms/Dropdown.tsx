import {
  forwardRef,
  HTMLAttributes,
  ImgHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from 'react'
import styled, { keyframes } from 'styled-components'
import icons from '../../assets/icons'
import { colors } from '../../styles'

const DropdownExpand = keyframes`
  0% {
    transform: translateY(-50px) scaleY(0);
    opacity: 0;
  }
  
  100%{
    transform: translateY(0px) scaleY(1);
    opacity: 1;
  }
`

const DropdownMenu = styled.ul`
  margin: 0;
  padding: 0;
  text-indent: 0;
  position: absolute;
  width: 100%;
  top: 44px;
  background-color: ${colors.white};
  border-radius: 20px;
  box-shadow: 1px 2px 5px ${colors.gray.gray5};
  animation-name: ${DropdownExpand};
  animation-duration: 0.5s;

  > li {
    margin: 0;
    padding: 0;
    text-indent: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    color: ${colors.gray.gray1};
    font-weight: normal;

    &:hover button {
      color: ${colors.white};
      font-weight: normal;
      background-color: ${colors.primary};
      border-radius: 20px;
    }
  }

  > li button {
    background-color: transparent;
    border: none;
    height: 45px;
    width: 100%;
  }
`

const DropdownButton = styled.div<TDropdown>`
  border: 1px solid ${colors.gray.gray3};
  position: relative;
  border-radius: 20px;
  width: 112px;
  height: 45px;
  cursor: pointer;

  > button {
    background-color: ${colors.white};
    border: none;
    font-weight: bold;
    margin-top: 0.6rem;
    margin-left: 0.4rem;
  }
`

const ChevronImg = styled.img<TImage>`
  position: absolute;
  left: 5rem;
  margin-top: 0.4rem;
  transition-duration: 0.2s;
  ${({ menuOpen }) => (menuOpen ? 'rotate: 180deg;' : '')}
`

interface TImage extends ImgHTMLAttributes<HTMLImageElement> {
  menuOpen: boolean
}

const defaultOptions = [
  { value: 'VIDEO', label: 'Vídeos' },
  { value: 'CURSO', label: 'Cursos' },
  { value: 'BLOG', label: 'Blogs' },
]

type TOption = {
  value: string
  label: string
}

type TDropdownOptions = {
  isOpen: boolean
  typeSelected: TOption
}

type TDropdown = HTMLAttributes<HTMLElement> & {
  options?: TOption[]
  setUpdated?: (value: string) => void
}

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

const Dropdown = forwardRef(
  ({ options = defaultOptions, setUpdated }: TDropdown, dropdownRef) => {
    const [dropdown, setDropdown] = useState<TDropdownOptions>({
      isOpen: false,
      typeSelected: options[0],
    })

    const ref = useOutsideClick(() => {
      setDropdown({ ...dropdown, isOpen: false })
    })

    useImperativeHandle(
      dropdownRef,
      () => ({
        getValue: () => dropdown.typeSelected.value,
      }),
      [dropdown.typeSelected.value]
    )

    const handleSelectedOption = (option: TOption, value: string) => {
      setDropdown({ isOpen: false, typeSelected: option })
      if (setUpdated) setUpdated(value)
    }

    return (
      <div ref={ref}>
        <DropdownButton data-testid="dropdown">
          <button
            type="button"
            data-testid="header"
            onClick={() =>
              setDropdown({ ...dropdown, isOpen: !dropdown.isOpen })
            }
            onKeyDown={() =>
              setDropdown({ ...dropdown, isOpen: !dropdown.isOpen })
            }
            role="textbox"
          >
            <span>{dropdown.typeSelected.label}</span>
            <ChevronImg
              src={icons.chevronDown}
              alt="expand"
              menuOpen={dropdown.isOpen}
            />
          </button>
          {dropdown.isOpen && (
            <DropdownMenu data-testid="menu">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelectedOption(option, option.value)}
                    onKeyDown={() => handleSelectedOption(option, option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </DropdownMenu>
          )}
        </DropdownButton>
      </div>
    )
  }
)

export default styled(Dropdown)``
