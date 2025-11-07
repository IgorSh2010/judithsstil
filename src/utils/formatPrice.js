export const formatPrice = (price) => {
  const numeric = Number(price) || 0; // захист від рядків або null
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
  }).format(numeric);
};

export default formatPrice;