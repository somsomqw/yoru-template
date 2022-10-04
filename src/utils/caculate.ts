// calculate discounted price
export const getDiscountPrice = (
  price: number,
  discountRate: number
): number => {
  const discountPrice = Math.floor((price * discountRate) / 100);
  return price - discountPrice;
};
