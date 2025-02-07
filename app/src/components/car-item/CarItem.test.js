import { render, screen } from '@testing-library/react';
import { CarItem } from 'components/car-item/CarItem';

describe('CarItem', () => {
  it('should render components with info', () => {
    render(<CarItem brand="Ford" model="Mustang" price={300} imageUrl={'image.jpg'} />);

    const image = screen.getByAltText('car photo');

    expect(screen.getByText('Ford Mustang')).toBeInTheDocument();
    expect(screen.getByText('300 zł / 1 dzień')).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'image.jpg');
  });

  it('should render component with basic photo', () => {
    render(<CarItem brand="Ford" model="Mustang" price={300} imageUrl={null} />);

    const image = screen.getByAltText('car photo');

    expect(screen.getByText('Ford Mustang')).toBeInTheDocument();
    expect(screen.getByText('300 zł / 1 dzień')).toBeInTheDocument();
    expect(image).not.toHaveAttribute('src', 'image.jpg');
    expect(image).toHaveAttribute('src', 'mistery-car.jpg');
  });
});
