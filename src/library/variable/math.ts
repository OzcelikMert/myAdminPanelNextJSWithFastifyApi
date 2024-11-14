declare global {
  interface Math {
    randomCustom(min: number, max: number): number;
    range(value: number, min: number, max: number, equal: boolean): boolean;
  }
}

Math.randomCustom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
Math.range = function (value, min, max, equal = false) {
  return equal ? value >= min && value <= max : value > min && value < max;
};

export default {};
