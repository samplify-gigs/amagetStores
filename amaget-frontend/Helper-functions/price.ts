export function PriceFormatter(
  price: number | string,
  locale: string = "en-US",
) {
  const actualPrice = typeof price === "string" ? parseFloat(price) : price;
  return actualPrice.toLocaleString(locale);
}
