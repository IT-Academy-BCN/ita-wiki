import { render, screen } from "../test-utils";
import { Navbar } from "../../components/organisms";

describe('Navbar', () => {
  it('renders correctly', () => {
    render(
          <Navbar title="Wiki" />
    );

    const titleElement = screen.getByText('Wiki');
    expect(titleElement).toBeInTheDocument();

  });
});
