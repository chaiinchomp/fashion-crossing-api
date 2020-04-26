
const byName = (items, name) => {
    return name == null ? items : items.filter(item => (item.name.toLowerCase() == name.toLowerCase()));
};

const byVariant = (items, variant) => {
    return variant == null ? items : items.filter(item => (item.variantName.toLowerCase() == variant.toLowerCase()));
};

const bySlot = (items, slot) => {
    return slot == null ? items : items.filter(item => (item.slot.toLowerCase() == slot.toLowerCase()));
};

const filter = (items, name, variant, slot) => {
    items = bySlot(items, slot);
    items = byName(items, name);
    items = byVariant(items, variant);
    return items;
}

module.exports = { filter };