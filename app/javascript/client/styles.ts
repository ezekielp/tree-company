interface Sizes {
    smaller: string;
    larger: string;
    largest: string;
}

const sizes: Sizes = {
    smaller: '450px',
    larger: '800px',
    largest: '1100px'
};

export const device = {
    mobileSmaller: `(max-width: ${sizes.smaller})`,
    mobileLarge: `(max-width: ${sizes.larger})`,
    larger: `(min-width: ${sizes.larger})`,
    largest: `(min-width: ${sizes.largest})`,
};

interface Colors {
    darkGreen: string;
}

export const colors: Colors = {
    darkGreen: "#004e00"
}

