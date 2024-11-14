import { Header } from 'components/header/Header';
import { Navbar } from 'components/navbar/Navbar';
import { Slider } from 'components/slider/Slider';
import { Content } from 'components/content/Content';

export const Main = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Slider />
      <Content />
    </div>
  );
};
