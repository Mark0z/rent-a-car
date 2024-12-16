import './car-item.scss';
import PropTypes from 'prop-types';
import car from 'assets/mistery-car.jpg';

// Prevent external links from refreshing too often
// eslint-disable-next-line no-unused-vars
export const CarItem = ({ brand, model, imageUrl, price }) => {
  return (
    <div className="car__item">
      <img className="car__item__image" src={car || ''} alt="" />
      <div className="car__item__title">
        {brand} {model}
      </div>
      <p className="car__item__price">{price} zł / 1 dzień</p>
    </div>
  );
};

CarItem.propTypes = {
  brand: PropTypes.string,
  model: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number
};
