import { Checkbox } from './Checkbox';
import { PhoneNumberInput } from './PhoneNumberInput';
import { SelectInput } from './SelectInput';
import { TextInput } from './TextInput';
import { ZipCodeInput } from './ZipCodeInput';
import { withFormik } from './withFormik';

export const FormikCheckbox = withFormik(Checkbox);
export const FormikTextInput = withFormik(TextInput);
export const FormikPhoneNumberInput = withFormik(PhoneNumberInput);
export const FormikSelectInput = withFormik(SelectInput);
export const FormikZipCodeInput = withFormik(ZipCodeInput);
