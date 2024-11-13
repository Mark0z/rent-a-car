import './slider.scss';
import { images } from 'data/images';

export const Slider = () => {
  return (
    <div className="slider">
      <img src={images[2].imgURL} alt="" />
    </div>
  );
};
