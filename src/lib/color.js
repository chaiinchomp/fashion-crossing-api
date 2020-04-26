const colordiff = require('color-difference');

const SLOT_WEIGHTS = {
  Tops: 0.9,
  Bottoms: 0.8,
  DressUp: 1.0,
  Headwear: 0.7,
  Accessories: 0.3,
  Socks: 0.1,
  Shoes: 0.3,
  Bags: 0.2,
  Umbrellas: 0.3,
};

const byValue = (a, b) => a - b;

const compare = ([a, b]) =>
  (colordiff.compare(a.color, b.color) + 10) *
  (1.0 / a.weight) *
  (1.0 / b.weight);

const withColorWeight = (color, index) => ({ color, weight: 2.0 / (index + 1) });

const withItemWeight = item => color => {
  const itemWeight = SLOT_WEIGHTS[item.slot] || 0.01;
  return { ...color, weight: color.weight * itemWeight };
};

const combos = (as, bs) => [].concat(...as.map(a => bs.map(b => [a, b])));

const withMatch = colors => item => {
  if (!item.colors || !item.colors.length) return item;

  const targetColorsWithWeight = colors.map(withColorWeight);
  const itemColorsWithWeight = item.colors
    .map(withColorWeight)
    .map(withItemWeight(item));

  const combinations = combos(targetColorsWithWeight, itemColorsWithWeight);
  const matches = combinations.map(compare);
  const match = matches.slice().sort(byValue)[0];

  return { ...item, match };
};

module.exports = { withMatch };
