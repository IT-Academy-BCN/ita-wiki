import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthProvider';
import { Navbar } from '../../components/organisms/Navbar';

it('renders Navbar component with a title', () => {
  render(
    <AuthProvider>
      <Navbar title="Test Title" />
    </AuthProvider>
    );

  const titleElement = screen.getByText('Test Title');

  expect(titleElement).toBeInTheDocument();
});
