import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from "../../components/organisms";
import { MobileStyled } from "../../pages/Home";

describe('Navbar', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <MobileStyled>
          <Navbar title="Wiki" />
        </MobileStyled>
      </BrowserRouter>
    );

    const titleElement = screen.getByText('Wiki');
    expect(titleElement).toBeInTheDocument();

  });
});
