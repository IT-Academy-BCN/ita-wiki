import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, device } from '../../styles'

const StyledAvatar = styled.img<TAvatar>`
  width: 97px;
  height: 97px;
  border-radius: 50%;
  object-fit: cover;
  appearance: auto;
  text-align: center;
  background-color: ${colors.gray.gray5};
  border: 1px solid ${colors.gray.gray4};

  @media only ${device.Tablet} {
    width: 118px;
    height: 118px;
    border: none;
  }
`
const defaultAvatar: string = (() => {
  const svgNoAvatarString = `
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="m14.4769 14h-4.95396c-1.45806.0724-2.74984.963-3.33601 2.3-.707 1.388.704 2.7 2.7h6.93597c1.642 0 3.053-1.312 2.345-2.7-.5861-1.337-1.8779-2.2276-3.336-2.3" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m15 8c0 1.65685-1.3431 3-3 3s-3-1.34315-3-3 1.3431-3 3-3c.7956 0 1.5587.31607 2.1213.87868s.8787 1.32567.8787 2.12132z" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  `;
  const blob = new Blob([svgNoAvatarString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  return url;
})();
export type TAvatar = HTMLAttributes<HTMLDivElement> & {
  src: string
  alt: string
}

const Avatar: FC<TAvatar> = ({ src, alt }) => (
  <StyledAvatar src={src === '' ? defaultAvatar : src} alt={alt} />
)

export default Avatar
