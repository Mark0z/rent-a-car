import './car-item.scss';
import PropTypes from 'prop-types';
import car from 'assets/mistery-car.jpg';

// Prevent external links from refreshing too often
// eslint-disable-next-line no-unused-vars
export const CarItem = ({ brand, model, imageUrl, price }) => {
  return (
    <div className="car-item">
      <img className="car-item--image" src={car} alt="" />
      <div className="car-item--title">
        {brand} {model}
      </div>
      <p className="car-item--price">{price} zł / 1 dzień</p>
    </div>
  );
};

CarItem.propTypes = {
  brand: PropTypes.string,
  model: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number
};
