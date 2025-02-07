import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import { CarItem } from 'components/car-item/CarItem';
import { Spinner } from 'components/spinner/Spinner';
import { Button } from 'components/inputs/button/Button';
import { TableOfCars } from 'components/table-of-cars/TableOfCars';
import { RegisterForm } from 'components/register-form/RegisterForm';
import { ContactMailForm } from 'components/contact-mail-form/ContactMailForm';
import { ChangePasswordForm } from 'components/change-password-form/ChangePasswordForm';
import { UserManagement } from 'components/user-management/UserManagement';

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
      <ComponentPreview path="/RegisterForm">
        <RegisterForm />
      </ComponentPreview>
      <ComponentPreview path="/ContactMailForm">
        <ContactMailForm />
      </ComponentPreview>
      <ComponentPreview path="/ChangePasswordForm">
        <ChangePasswordForm />
      </ComponentPreview>
      <ComponentPreview path="/UserManagement">
        <UserManagement />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
