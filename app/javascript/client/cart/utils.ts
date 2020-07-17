export const determinePrice = (quantity: number): number => {
    if (quantity < 10) {
        return 7;
    } else if (quantity < 50) {
        return 5;
    } else if (quantity < 100) {
        return 4;
    } else {
        return 3;
    }
};
