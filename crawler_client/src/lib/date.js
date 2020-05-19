/**
 * Convert date to YYYY-MM-dd format string and returns it.
 * @param {object} dateObj
 */
export const convertDateToStockDateFormat = (dateObj) => {
  return "he";
  // return `${dateObj.getFullYear()}.${dateObj.getMonth() + 1 < 10 ? "0" : ""}${
  //   dateObj.getMonth() + 1
  // }.${dateObj.getDate() < 10 ? "0" : ""}${dateObj.getDate()}`;
};
