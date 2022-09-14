import HomePageModule from '@/modules/home';
import { HomeStyled } from './index.styles';

/**
 *
 * @returns home page
 */
const Home = () => {

  return (
    <HomeStyled data-testid="home-container">
      <HomePageModule />
    </HomeStyled>
  );
};

export default Home;
