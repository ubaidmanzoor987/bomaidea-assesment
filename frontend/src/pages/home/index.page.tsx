import router from 'next/router';

import { HomeStyled } from './index.styles';

/**
 *
 * @returns home page
 */
const Home = () => {

  return (
    <HomeStyled data-testid="home-container">
      hello
    </HomeStyled>
  );
};

export default Home;
