/**
 * Convert date to YYYY-MM-dd format string and returns it.
 * @param {object} dateObj
 */
export const convertDateToStockDateFormat = (dateObj) => {
  return `${dateObj.getFullYear()}.${dateObj.getMonth() + 1 < 10 ? "0" : ""}${
    dateObj.getMonth() + 1
  }.${dateObj.getDate() < 10 ? "0" : ""}${dateObj.getDate()}`;
};

/**
 * Convert string to date object
 * @param {string} dateStr
 */
export const convertStringToDate = (dateStr) => {
  return new Date(dateStr);
};

/**
 * Convert date string to LocalDateString
 * @param {string} dateStr
 */
export const convertStringToLocalDateString = (dateStr, locale = "en-US") => {
  return convertStringToDate(dateStr).toLocaleString(locale);
};
