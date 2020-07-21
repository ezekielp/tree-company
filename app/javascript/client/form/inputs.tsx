import { PhoneNumberInput } from './PhoneNumberInput';
import { TextInput } from './TextInput';
import { withFormik } from './withFormik';

export const FormikTextInput = withFormik(TextInput);
export const FormikPhoneNumberInput = withFormik(PhoneNumberInput);
