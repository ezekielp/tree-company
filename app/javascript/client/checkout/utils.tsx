import { CheckoutFormData } from './Checkout';
import * as yup from 'yup';

export const displayPrice = (price: number): string => {
    return (price / 100).toFixed(2);
};

export const setShippingAddress = (values: CheckoutFormData, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void): void => {
    const { billingName, billingAddress, billingCity, billingState, billingZipCode, billingPhoneNumber, sameAddress } = values;

    setFieldValue('shippingName', billingName);
    setFieldValue('shippingAddress', billingAddress);
    setFieldValue('shippingCity', billingCity);
    setFieldValue('shippingState', billingState);
    setFieldValue('shippingZipCode', billingZipCode);

    billingPhoneNumber && setFieldValue('shippingPhoneNumber', billingPhoneNumber);

    setFieldValue('sameAddress', !sameAddress);
}

export const validationSchema = yup.object({
					billingName: yup.string().required().label("Billing name"),
					billingAddress: yup.string().required().label("Billing address"),
					billingCity: yup.string().required().label("Billing city"),
					billingZipCode: yup
						.string()
						.required()
						.label("Billing zip code")
						.nullable()
						.test({
							name: "isAZipCode1",
							test: (v: string | null) => {
								if (!v) {
									return false;
								} else {
									return v.length === 5 || v.length === 9;
								}
							},
							message:
								"Please enter either a five-digit or nine-digit zip code",
						}),
					billingPhoneNumber: yup
						.string()
						.length(
							10,
							"Please enter a 10-digit US phone number, or leave blank"
						)
						.nullable(),
					email: yup.string().required().email().label("Email"),
					taxExempt: yup.boolean(),
					taxId: yup.string().when("taxExempt", {
						is: true,
						then: yup
							.string()
							.required("A Maryland Sales and Use Tax Number or Exemption Certificate Number is required for a tax-exempt order"),
					}),
					sameAddress: yup.boolean(),
					localPickup: yup.boolean(),
					shippingName: yup.string().when("localPickup", {
						is: false,
						then: yup
							.string()
                            .required()
                            .label("Company name"),
					}),
					shippingAddress: yup.string().when("localPickup", {
						is: false,
						then: yup
							.string()
							.required()
                            .label("Shipping address"),
					}),
					shippingCity: yup.string().when("localPickup", {
						is: false,
						then: yup
							.string()
							.required()
                            .label("Shipping city"),
					}),
					shippingZipCode: yup.string().when("localPickup", {
						is: false,
						then: yup
							.string()
							.required()
                            .label("Shipping zip code")
							.nullable()
							.test({
								name: "isAZipCode1",
								test: (v: string | null) => {
									if (!v) {
										return false;
									} else {
										return v.length === 5 || v.length === 9;
									}
								},
								message:
									"Please enter either a five-digit or nine-digit zip code",
							}),
					}),
					shippingPhoneNumber: yup
						.string()
						.length(
							10,
							"Please enter a 10-digit US phone number, or leave blank"
						)
						.nullable(),
					attn: yup.string(),
				});

export const initialValues = {
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingState: 'MD',
    billingZipCode: '',
    email: '',
    taxExempt: false,
    taxId: '',
    localPickup: false,
    sameAddress: false,
    shippingName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: 'MD',
    shippingZipCode: '',
    attn: '',
    paymentMethod: 'card'
};

export const STATE_OPTIONS = [
    {
        label: 'Alaska',
        value: 'AK'
    },
    {
        label: 'Alabama',
        value: 'AL'
    },
    {
        label: 'Arkansas',
        value: 'AR'
    },
    {
        label: 'Arizona',
        value: 'AZ'
    },
    {
        label: 'California',
        value: 'CA'
    },
    {
        label: 'Colorado',
        value: 'CO'
    },
    {
        label: 'Connecticut',
        value: 'CT'
    },
    {
        label: 'Delaware',
        value: 'DE'
    },
    {
        label: 'Florida',
        value: 'FL'
    },
    {
        label: 'Georgia',
        value: 'GA'
    },
    {
        label: 'Hawaii',
        value: 'HI'
    },
    {
        label: 'Iowa',
        value: 'IA'
    },
    {
        label: 'Idaho',
        value: 'ID'
    },
    {
        label: 'Illinois',
        value: 'IL'
    },
    {
        label: 'Indiana',
        value: 'IN'
    },
    {
        label: 'Kansas',
        value: 'KS'
    },
    {
        label: 'Kentucky',
        value: 'KY'
    },
    {
        label: 'Louisiana',
        value: 'LA'
    },
    {
        label: 'Massachusetts',
        value: 'MA'
    },
    {
        label: 'Maryland',
        value: 'MD',
        selected: true
    },
    {
        label: 'Maine',
        value: 'ME'
    },
    {
        label: 'Michigan',
        value: 'MI'
    },
    {
        label: 'Minnesota',
        value: 'MN'
    },
    {
        label: 'Missouri',
        value: 'MO'
    },
    {
        label: 'Mississippi',
        value: 'MS'
    },
    {
        label: 'Montana',
        value: 'MT'
    },
    {
        label: 'Nebraska',
        value: 'NE'
    },
    {
        label: 'New Hampshire',
        value: 'NH'
    },
    {
        label: 'New Jersey',
        value: 'NJ'
    },
    {
        label: 'New Mexico',
        value: 'NM'
    },
    {
        label: 'Nevada',
        value: 'NV'
    },
    {
        label: 'New York',
        value: 'NY'
    },
    {
        label: 'North Carolina',
        value: 'NC'
    },
    {
        label: 'North Dakoa',
        value: 'ND'
    },
    {
        label: 'Ohio',
        value: 'OH'
    },
    {
        label: 'Oklahoma',
        value: 'OK'
    },
    {
        label: 'Oregon',
        value: 'OR'
    },
    {
        label: 'Pennsylvania',
        value: 'PA'
    },
    {
        label: 'Rhode Island',
        value: 'RI'
    },
    {
        label: 'South Carolina',
        value: 'SC'
    },
    {
        label: 'South Dakota',
        value: 'SD'
    },
    {
        label: 'Tennessee',
        value: 'TN'
    },
    {
        label: 'Texas',
        value: 'TX'
    },
    {
        label: 'Utah',
        value: 'UT'
    },
    {
        label: 'Vermont',
        value: 'VT'
    },
    {
        label: 'Virginia',
        value: 'VA'
    },
    {
        label: 'Washington',
        value: 'WA'
    },
    {
        label: 'Washington, D.C.',
        value: 'DC'
    },
    {
        label: 'West Virginia',
        value: 'WV'
    },
    {
        label: 'Wisconsin',
        value: 'WI'
    },
    {
        label: 'Wyoming',
        value: 'WY'
    },
];

