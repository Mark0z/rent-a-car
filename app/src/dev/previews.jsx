import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import { CarItem } from 'components/car-item/CarItem';
import { Spinner } from 'components/spinner/Spinner';
import { Button } from 'components/inputs/button/Button';

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
    </Previews>
  );
};

export default ComponentPreviews;
