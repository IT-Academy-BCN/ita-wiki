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

const StyledFlexBox = styled(FlexBox)<{
  $size: 'small' | 'normal' | 'large'
}>`
  width: 100%;
  gap: ${({ $size }) =>
    ($size === 'small' && '0.3rem') ||
    ($size === 'large' && dimensions.spacing.xs) ||
    dimensions.spacing.xxs};
`

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
`

const DeselectIcon = styled(Icon)`
  margin-left: auto;
`

export const DropdownHeaderText = styled.span<{
  $size: 'small' | 'normal' | 'large'
}>`
  font-size: ${({ $size }) =>
    ($size === 'small' && font.xss) ||
    ($size === 'large' && font.base) ||
    font.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const DropdownHeader = styled(Button)<{
  $size: 'small' | 'normal' | 'large'
}>`
  justify-content: space-between;
  background-color: ${colors.white};
  padding: ${({ $size }) =>
    $size === 'small'
      ? `${dimensions.spacing.xxxs} ${dimensions.spacing.xs}`
      : dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};
  color: ${colors.black.black3};
  width: ${({ $size }) =>
    ($size === 'small' && '200px') ||
    ($size === 'large' && '400px') ||
    '320px'};

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

const DropdownItem = styled(FlexBox)<{
  $isSelected: boolean
  $size: 'small' | 'normal' | 'large'
}>`
  gap: ${({ $size }) =>
    ($size === 'small' && '0.3rem') ||
    ($size === 'large' && dimensions.spacing.xs) ||
    dimensions.spacing.xxs};
  padding: ${({ $size }) =>
    ($size === 'small' && '12px 10px') ||
    ($size === 'large' && '12px 18px') ||
    '12px 16px'};
  cursor: pointer;
  font-family: ${font.fontFamily};
  font-size: ${({ $size }) =>
    ($size === 'small' && font.xss) ||
    ($size === 'large' && font.base) ||
    font.xs};
  display: flex;
  align-items: center;
  color: ${({ $isSelected }) =>
    $isSelected ? `${colors.white}` : `${colors.gray.gray3}`};
  background-color: ${({ $isSelected }) =>
    $isSelected ? `${colors.primaryLight}` : `${colors.white}`};

  ${StyledIcon} {
    color: ${({ $isSelected }) =>
      $isSelected ? `${colors.white}` : `${colors.gray.gray3}`};
  }

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
  onValueChange?: (selectedOption?: TDropdownOption | undefined) => void
  openText?: string
  closeText?: string
  deselectText?: string
  className?: string
  $size?: 'small' | 'normal' | 'large'
  resetSelectedValue?: boolean
  disabled?: boolean
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
      deselectText = 'Borra la selección',
      className = '',
      $size = 'normal',
      resetSelectedValue = undefined,
      disabled = undefined,
      ...rest
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
      },
      [onValueChange]
    )

    const handleDeselect = () => {
      setSelectedValue(undefined)
      if (onValueChange) {
        onValueChange(undefined)
      }
    }

    useEffect(() => {
      if (resetSelectedValue) {
        setSelectedValue(undefined)
      }
    }, [resetSelectedValue])

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
        <StyledDropdown ref={dropdownCloseOutsideRef} {...rest}>
          <DropdownHeader
            data-testid="dropdown-header"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            $size={$size}
            disabled={disabled}
          >
            {selectedOption ? (
              <StyledFlexBox
                direction="row"
                key={selectedOption.id}
                justify="flex-start"
                $size={$size}
              >
                {selectedOption.icon && (
                  <StyledIcon name={selectedOption.icon} />
                )}
                {selectedOption.iconSvg && (
                  <StyledImage
                    src={selectedOption.iconSvg}
                    alt={selectedOption.name}
                  />
                )}
                <DropdownHeaderText $size={$size}>
                  {selectedOption.name}
                </DropdownHeaderText>
                <DeselectIcon
                  name="close"
                  onClick={() => handleDeselect()}
                  title={deselectText}
                  data-testid={`deselect-${selectedOption.id}`}
                />
              </StyledFlexBox>
            ) : (
              <DropdownHeaderText $size={$size}>
                {placeholder}
              </DropdownHeaderText>
            )}
            {!selectedOption ? (
              <StyledIcon
                name={isDropdownOpen ? 'expand_less' : 'expand_more'}
                aria-hidden="true"
                title={isDropdownOpen ? closeText : openText}
              />
            ) : null}
          </DropdownHeader>
          {isDropdownOpen && (
            <DropdownList ref={dropdownListRef}>
              {options.map((option) => (
                <DropdownItem
                  direction="row"
                  justify="flex-start"
                  key={option.id}
                  data-testid={option.id}
                  id={option.id}
                  onClick={
                    option.id === selectedOption?.id
                      ? () => setIsDropdownOpen(false)
                      : () => handleSelect(option)
                  }
                  $isSelected={option.id === selectedOption?.id}
                  $size={$size}
                >
                  {option.icon && <StyledIcon name={option.icon} />}
                  {option.iconSvg && (
                    <StyledImage src={option.iconSvg} alt={option.name} />
                  )}
                  <span>{option.name}</span>
                  {option.id === selectedOption?.id ? (
                    <DeselectIcon
                      name="close"
                      onClick={() => handleDeselect()}
                      title={deselectText}
                      data-testid={`deselect-${option.id}`}
                    />
                  ) : null}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </StyledDropdown>
      </div>
    )
  }
)
