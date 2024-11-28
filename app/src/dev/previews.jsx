import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import { CarItem } from 'components/car-item/CarItem';
import { Spinner } from 'components/spinner/Spinner';
import { Button } from 'components/inputs/button/Button';
import { TableOfCars } from 'components/table-of-cars/TableOfCars';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/CarItem">
        <CarItem />
      </ComponentPreview>
      <ComponentPreview path="/Spinner">
        <Spinner />
      </ComponentPreview>
      <ComponentPreview path="/Button">
        <Button />
      </ComponentPreview>
      <ComponentPreview path="/TableOfCars">
        <TableOfCars />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
