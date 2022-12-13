/** 
 * https://developers.google.com/apps-script/quickstart/custom-functions
 * https://docs.google.com/spreadsheets/d/1-o8wLhGzlFNzkuIg8THvD4iCyVejcigyIeRsZOmS794/edit#gid=0
*/

/**
 * Calculates the sale price of a value at a given discount.
 * The sale price is formatted as US dollars.
 *
 * @param {number} input The value to discount.
 * @param {number} discount The discount to apply, such as .5 or 50%.
 * @return The sale price formatted as USD.
 * @customfunction
 */
function salePrice(input, discount) {
  let price = input - (input * discount);
  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
  return dollarUS.format(price);
}