import {  fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { colors, dimensions, font } from '../../styles';
import { Link } from  '../../components/atoms'

const mockClick = vi.fn();

describe('Link', () => {
  it('renders correctly', () => {
    render(
      <Link href="/" onClick={mockClick}>
        Test text
      </Link>
    );
    const link = screen.getByTestId('link');

    expect(link).toBeInTheDocument();
    expect(screen.getByText('Test text')).toBeInTheDocument();
    expect(link).toHaveStyle(`margin: ${dimensions.spacing.xxs}`);
    expect(link).toHaveStyle('cursor: pointer');
    expect(link).toHaveStyle(`color: ${colors.black}`);
    expect(link).toHaveStyle(`font-weight: ${font.regular}`);

    fireEvent.click(link);
    expect(mockClick).toHaveBeenCalled();
  });
});
