const ColorThief = require('color-thief');
const colorThief = new ColorThief();
const fetch = require('node-fetch');

const FETCH_OPTIONS = {
  headers: {
    'User-Agent': 'Fashion Crossing Bot (https://github.com/chaiinchomp/fashion-crossing-api)',
  },
};

const toHex = ([r, g, b]) => {
  const val = (r << 16) | (g << 8) | b;
  const hex = val.toString(16);

  return hex.length === 5 ? `#0${hex}` : `#${hex}`;
};

const toPalette = async src => {
  const buffer = await fetch(src, FETCH_OPTIONS).then(res => res.buffer());

  // getPalette can return +/- 2 quantity
  const palette = colorThief.getPalette(buffer, 3).slice(0, 3);

  return palette.map(toHex);
};

const withColor = async itemJson => {
  const variantsWithColors = []
  for (const variantJson of itemJson.variants) {
    const image = variantJson.storageImage;
    console.log(`getting image from url ${image}`)
    const extractedColors = await toPalette(image);
    variantsWithColors.push({ ...variantJson, extractedColors })
  }

  itemJson.variants = variantsWithColors;

  // itemJson.variants.forEach((variantJson) => {
  //   const image = variantJson.image;
  //   const colors = await toPalette(image);
  //   return { ...variantJson, colors }
  // });

  return itemJson;
};

module.exports = { withColor };
