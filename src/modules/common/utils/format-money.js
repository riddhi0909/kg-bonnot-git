/**
 * @param {number} amount
 * @param {string} currency ISO 4217
 * @param {string} [locale]
 */
export function formatMoney(amount, currency, locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
