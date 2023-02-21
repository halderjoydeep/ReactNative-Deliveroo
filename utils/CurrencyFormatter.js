export function currencyFormat(num, currency_symbol) {
  return (
    currency_symbol + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  );
}
