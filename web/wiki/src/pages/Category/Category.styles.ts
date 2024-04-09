import styled, { keyframes } from 'styled-components'
import {
  Button,
  FlexBox,
  SelectGroup,
  colors,
  device,
  dimensions,
} from '@itacademy/ui'

export const Container = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;

  @media only ${device.Tablet} {
    height: 100vh;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.gray.gray5};
    padding: ${dimensions.spacing.none} ${dimensions.spacing.md}
      ${dimensions.spacing.xl} ${dimensions.spacing.sm};
  }
`

export const ContainerMain = styled(FlexBox)`
  width: 100%;
  height: 90%;

  @media ${device.Tablet} {
    flex-direction: row;
    align-items: flex-start;
    gap: ${dimensions.spacing.xs};
    justify-content: flex-end;
  }

  @media ${device.Laptop} {
    gap: ${dimensions.spacing.md};
  }

  @media ${device.Desktop} {
    gap: ${dimensions.spacing.xl};
  }
`

export const WiderContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
`

export const MainContainer = styled(FlexBox)`
  height: 100%;
  width: 100%;
  background-color: ${colors.white};
  padding: ${dimensions.spacing.sm} ${dimensions.spacing.xxs};
  border-radius: ${dimensions.borderRadius.base};

  @media ${device.Tablet} {
    flex-direction: row;
    padding: ${dimensions.spacing.md} ${dimensions.spacing.xxs};
  }

  @media ${device.Desktop} {
    flex-direction: row;
    padding: ${dimensions.spacing.md} ${dimensions.spacing.xxxl};
  }
`

export const FiltersContainer = styled(FlexBox)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1 2 9rem;
  }

  @media ${device.Laptop} {
    flex: 1 2 28rem;
  }

  @media ${device.Desktop} {
    flex: 1 2 34rem;
  }
`

export const ScrollTopics = styled(FlexBox)`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ResourcesContainer = styled(FlexBox)`
  padding-left: ${dimensions.spacing.xxxs};
  overflow-y: auto;
  height: 99%;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.Laptop} {
    width: 100%;
    padding-left: ${dimensions.spacing.md};
  }
`

export const TitleResourcesContainer = styled(FlexBox)`
  width: 100%;
  padding: ${dimensions.spacing.none};
`

export const ScrollDiv = styled(FlexBox)`
  overflow: hidden;
  overflow-x: auto;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ContainerResourcesAside = styled(FlexBox)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-end;
    gap: ${dimensions.spacing.xs};
    height: 100%;
    flex: 1 1 22rem;
  }

  @media ${device.Laptop} {
    gap: ${dimensions.spacing.md};
    flex: 1 1 24rem;
  }

  @media ${device.Desktop} {
    gap: ${dimensions.spacing.xl};
    flex: 1 1 27rem;
  }
`

export const ResourcesAside = styled(FlexBox)`
  flex: 1 2 19rem;
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.base};

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.Tablet} {
    padding: ${dimensions.spacing.none} ${dimensions.spacing.xs}
      ${dimensions.spacing.xl} ${dimensions.spacing.xs};
  }

  @media ${device.Laptop} {
    padding: ${dimensions.spacing.none} ${dimensions.spacing.xs}
      ${dimensions.spacing.xl} ${dimensions.spacing.lg};
  }
`
export const MobileContainer = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.none} ${dimensions.spacing.xs}
    ${dimensions.spacing.md} ${dimensions.spacing.base};
  position: sticky;
  top: 0;
  z-index: 1;
  height: 100%;
  width: 100%;

  @media ${device.Tablet} {
    display: none;
  }
`

export const MobileTopicsContainer = styled(MobileContainer)<{
  $isSearch: boolean
}>`
  display: ${({ $isSearch }) => ($isSearch ? 'none' : 'flex')};

  @media ${device.Tablet} {
    display: none;
  }
`
export const MobileSearchContainer = styled(MobileContainer)<{
  $isSearch: boolean
}>`
  display: ${({ $isSearch }) => ($isSearch ? 'flex' : 'none')};

  @media ${device.Tablet} {
    display: none;
  }
`

export const NewResourceButton = styled(Button)`
  display: flex;
  border-radius: ${dimensions.borderRadius.sm};
  padding: ${dimensions.spacing.md};
  color: ${colors.gray.gray3};
  background-color: ${colors.white};
  border: 1px dashed ${colors.gray.gray3};
  margin-bottom: ${dimensions.spacing.xs};

  &:hover {
    background-color: ${colors.white};
    border: 1px dashed ${colors.gray.gray3};
  }

  @media ${device.Mobile} {
    display: none;
  }
`

export const StyledSelectGroup = styled(SelectGroup)`
  border: none;

  &:focus {
    outline: 0 none;
  }
`

export const FilterButton = styled(Button)`
  color: ${colors.black.black1};
  background-color: ${colors.white};
  border: 1.5px solid ${colors.gray.gray3};
  width: fit-content;
  padding: ${dimensions.spacing.xs} ${dimensions.spacing.lg};
  margin-bottom: ${dimensions.spacing.xs};

  &:hover {
    background-color: ${colors.white};
    border: 1.5px solid ${colors.primary};
  }

  @media ${device.Tablet} {
    display: none;
  }
`

const slideInAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
`

const slideOutAnimation = keyframes`
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100%);
  }
`

export const MobileFiltersContainer = styled.div`
  display: block;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${dimensions.spacing.md};
  height: 50%;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  border-top-left-radius: ${dimensions.borderRadius.sm};
  border-top-right-radius: ${dimensions.borderRadius.sm};
  box-shadow: ${dimensions.spacing.none} -0.2rem ${dimensions.spacing.base} ${colors.gray.gray3};

  &.open {
    transform: translateY(100%);
    animation: ${slideInAnimation} 1s forwards;
  }

  &.close {
    transform: translateY(0%);
    animation: ${slideOutAnimation} 1s forwards;
  }

  @media ${device.Tablet} {
    display: none;
  }
`

export const CloseFilterButton = styled(Button)`
  color: ${colors.black.black1};
  background-color: ${colors.white};
  border: none;
  font-size: larger;
  margin-top: ${dimensions.spacing.base};

  &:hover {
    background-color: ${colors.white};
    border: none;
  }
`
