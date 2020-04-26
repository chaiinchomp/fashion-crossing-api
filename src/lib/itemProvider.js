const allClothingJson = require('../../data/clothing.json');

const allVariants = [];
allClothingJson.forEach((clothingJson) => {
  clothingJson.variants.forEach((variant) => {
    allVariants.push({
      id: variant.uniqueEntryId,
      slot: clothingJson.sourceSheet,
      name: clothingJson.name,
      variantName: variant.variation == null ? 'Base' : variant.variation.toString(),
      image: variant.storageImage,
      colors: variant.extractedColors
    })
  });
});

const itemProvider = (req, res, next) => {
  req.items = allVariants;
  next();
};

module.exports = itemProvider;
