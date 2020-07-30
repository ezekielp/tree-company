interface Sizes {
    larger: string;
}

const sizes: Sizes = {
    larger: '800px',
};

export const device = {
    mobile: `(max-width: ${sizes.larger})`,
    larger: `(min-width: ${sizes.larger})`
};
