import { render, screen } from '@testing-library/react';
import Avatar from '../../components/molecules/AvatarProfile';

describe('Avatar', () => {
  it('renders image when logged in', () => {
    const imageUrl = 'https://cdn-icons-png.flaticon.com/512/16/16410.png';
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
