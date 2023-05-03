import { render, screen } from '@testing-library/react';
import Avatar from '../../components/molecules/AvatarProfile';

describe('Avatar', () => {
  it('renders image when logged in', () => {
    const imageUrl = 'https://example.com/avatar.jpg';
    render(<Avatar isLoggedIn image={imageUrl} />);

    const imageElement = screen.getByAltText('Avatar');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', imageUrl);
  });

  it('renders icon when not logged in', () => {
    render(<Avatar isLoggedIn={false} />);

    const iconElement = screen.getByLabelText('account_circle');

    expect(iconElement).toBeInTheDocument();
  });
});
