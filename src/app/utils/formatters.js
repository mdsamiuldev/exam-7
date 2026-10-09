export const convertToBengaliDigits = (number) => {
  if (number === undefined || number === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number
    .toString()
    .replace(/\d/g, (match) => bengaliDigits[parseInt(match)]);
};