export const ouncesToPounds = (weight: number): number =>
toFixedNumber(weight / 16, 2);

export const poundsToOunces = (weight: number): number =>
  toFixedNumber(weight * 16, 2);

export const toFixedNumber = (val: any, decimal: number): number => {
  if (isNaN(Number(val))) {
    return 0;
  }
  return Number(Number(val).toFixed(decimal));
};
