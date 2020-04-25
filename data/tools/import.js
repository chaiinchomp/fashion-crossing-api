const fs = require('fs');
const slow = require('slow');

const { withColor } = require('./color');

const clothingSources = ['Tops', 'Bottoms', 'Dress-Up', 'Headwear', 'Accessories', 'Socks', 'Shoes', 'Bags', 'Umbrellas']

let clothingJson = [];

const importItem = async itemJson => {
  if (clothingSources.indexOf(itemJson.sourceSheet) >= 0) {
    const itemModel = await withColor(itemJson);
    clothingJson.push(itemModel);
  }
}

const importItems = async (infile, outfile) => {
  const allItemsJson = JSON.parse(fs.readFileSync(infile));

  await slow.walk(allItemsJson, importItem);

  fs.writeFileSync(outfile, JSON.stringify(clothingJson, null, 2));
};

const [_, __, infile, outfile] = process.argv;

importItems(infile, outfile);
