import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import { CarItem } from 'components/car-item/Car-item';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/CarItem">
        <CarItem />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
