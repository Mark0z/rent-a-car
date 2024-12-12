import './slider.scss';
import { images } from 'data/images';
import { useEffect, useState } from 'react';

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextIndex((currentIndex + 1) % images.length);

      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slider__slide ${
            index === currentIndex ? 'active' : index === nextIndex ? 'next' : ''
          }`}>
          <img src={image.imgURL} alt="" className="slider__image" />
          <div className="slider__text">{image.text}</div>
        </div>
      ))}
    </div>
  );
};
