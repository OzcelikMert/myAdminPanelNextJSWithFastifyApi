declare global {
  interface Number {
    isInt(): boolean;
    isFloat(): boolean;
    getPercent(min: number, max: number): number;
  }
}

Number.prototype.isInt = function () {
  if (typeof this !== 'number') return false;
  const n: number = this;
  return Number(n) === n && n % 1 === 0;
};
Number.prototype.isFloat = function () {
  if (typeof this !== 'number') return false;
  const n = this;
  return Number(n) === n && n % 1 !== 0;
};
Number.prototype.getPercent = function (min, max) {
  if (typeof this !== 'number') return 0;
  return (100 * (this - min)) / (max - min);
};

export default {};
