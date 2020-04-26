const fs = require('fs');
const slow = require('slow');
const allItemsJson = require('@nooksbazaar/acdb/items.json');

const { withColor } = require('./color');

const clothingSources = ['Tops', 'Bottoms', 'Dress-Up', 'Headwear', 'Accessories', 'Socks', 'Shoes', 'Bags', 'Umbrellas']

let clothingJson = [];

const importItem = async itemJson => {
  if (clothingSources.indexOf(itemJson.sourceSheet) >= 0) {
    const itemModel = itemJson;
    if (itemModel.sourceSheet == 'Dress-Up') {
      itemModel.sourceSheet = 'DressUp';
    }
    itemModel = await withColor(itemJson);
    clothingJson.push(itemModel);
  }
}

const importItems = async (outfile) => {
  await slow.walk(allItemsJson, importItem);
  fs.writeFileSync(outfile, JSON.stringify(clothingJson, null, 2));
};

const [_, __, outfile] = process.argv;

importItems(outfile);
