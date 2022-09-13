import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import store from '@/store';

import Home from './index.page';
import { mockNextUseRouter } from '@/mocks/useRouter';

describe('Home Page', () => {
  mockNextUseRouter('/');
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  test('it should render home page', () => {
    const homeContainer = screen.getByTestId('home-container');
    expect(homeContainer).toBeInTheDocument();
  });

});
