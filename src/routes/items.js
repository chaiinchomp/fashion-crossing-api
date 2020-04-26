const express = require('express');
const router = express.Router();
const { withMatch } = require('../lib/color');
const { filter } = require('../lib/filterItems');

router.get('/', (req, res) => {
  const items = req.items;
  const itemsNameOnly = items.map(item => ({ name: item.name })).sort(byName);

  res.json({ items: itemsNameOnly });
});

router.get('/search/', (req, res, next) => {
  const items = req.items;
  const name = req.query.name;
  const variant = req.query.variant;
  const slot = req.query.slot;

  const results = filter(items, name, variant, slot);
  if (results === undefined || results.length == 0) throw Error('No matches found.');

  res.json(results);
});

router.get('/match/', (req, res, next) => {
  const items = req.items;
  const name = req.query.name;
  const slot = req.query.slot;
  const variant = req.query.variant;

  const results = filter(items, name, variant);
  if (results === undefined || results.length == 0) throw Error('No matches found.');

  // Use first result even if we got multiple
  const targetItem = results[0];
  const targetColors = targetItem ? targetItem.colors : [];
  const matches = items
    .filter(isForSlot(slot))
    .map(withMatch(targetColors))
    .sort(byMatch)
    .slice(0, 50);

  res.json({ items: matches });
});

const byMatch = (a, b) => a.match - b.match;

const byName = (a, b) => {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
};

const isForSlot = slot => item => !slot || item.slot == slot;

module.exports = router;
