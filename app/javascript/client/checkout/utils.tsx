import * as yup from 'yup';

export const displayPrice = (price: number): string => {
    return (price / 100).toFixed(2);
};

export const validationSchema = yup.object({
					billingName: yup.string().required().label("Name"),
					billingAddress: yup.string().required().label("Address"),
					billingCity: yup.string().required().label("City"),
					billingZipCode: yup
						.string()
						.required()
						.label("Zip code")
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
					sameAddress: yup.boolean(),
					localPickup: yup.boolean(),
					shippingName: yup.string().when(["sameAddress", "localPickup"], {
						is: (sameAddress, localPickup) => sameAddress === false && localPickup === false,
						then: yup
							.string()
							.required(
								"Shipping name is required if your billing address and shipping address are not the same. Please check the box above if they are the same."
							),
					}),
					shippingAddress: yup.string().when(["sameAddress", "localPickup"], {
						is: (sameAddress, localPickup) => sameAddress === false && localPickup === false,
						then: yup
							.string()
							.required(
								"Shipping address is required if your billing address and shipping address are not the same. Please check the box above if they are the same."
							),
					}),
					shippingCity: yup.string().when(["sameAddress", "localPickup"], {
						is: (sameAddress, localPickup) => sameAddress === false && localPickup === false,
						then: yup
							.string()
							.required(
								"Shipping city is required if your billing address and shipping address are not the same. Please check the box above if they are the same."
							),
					}),
					shippingZipCode: yup.string().when(["sameAddress", "localPickup"], {
						is: (sameAddress, localPickup) => sameAddress === false && localPickup === false,
						then: yup
							.string()
							.required(
								"Shipping zip code is required if your billing address and shipping address are not the same. Please check the box above if they are the same."
							)
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
    localPickup: false,
    sameAddress: false,
    shippingName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: 'MD',
    shippingZipCode: '',
    attn: ''
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

