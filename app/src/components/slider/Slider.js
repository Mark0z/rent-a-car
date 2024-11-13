import './slider.scss';
import { images } from 'data/images';

export const Slider = () => {
  return (
    <div className="slider">
      <img src={images[1].imgURL} alt="" />
      <div className="slider-text">{images[1].text}</div>
    </div>
  );
};
