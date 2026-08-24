export function PriceFormatter(
  price: number | string,
  locale: string = "en-US",
) {

  const actualPrice = typeof price === "string" ? parseFloat(price) : price;
  const convertedPrice = actualPrice * 1400;
  return convertedPrice.toLocaleString(locale);
}
