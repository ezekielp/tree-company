export const determinePrice = (quantity: number): number => {
    if (quantity < 10) {
        return 700;
    } else if (quantity < 50) {
        return 500;
    } else if (quantity < 100) {
        return 400;
    } else {
        return 300;
    }
};
