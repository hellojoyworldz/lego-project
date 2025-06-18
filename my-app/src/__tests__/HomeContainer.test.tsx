import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import '../i18n';

describe('HomeContainer', () => {
  it('renders count text', () => {
    render(
      <BrowserRouter>
        <HomeContainer />
      </BrowserRouter>
    );
    expect(screen.getByText(/count:/i)).toBeInTheDocument();
  });
});
