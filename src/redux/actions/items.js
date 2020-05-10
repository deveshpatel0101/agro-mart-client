export const addItem = ({ itemId, title, description, createdAt = 0, lastModified = 0 } = {}) => ({
  type: 'ADD_ITEM',
  item: {
    itemId,
    description,
    title,
    createdAt,
    lastModified,
  },
});

export const removeItem = ({ itemId } = {}) => ({
  type: 'REMOVE_ITEM',
  itemId,
});

export const editItem = (itemId, updates) => ({
  type: 'EDIT_ITEM',
  itemId,
  updates,
});

export const addItemsArr = (itemsArr) => ({
  type: 'ADD_ITEM_ARR',
  items: itemsArr,
});

export const sharedItem = (itemId) => ({
  type: 'SHARED_ITEM',
  itemId,
});

export const addAddress = (address, itemId) => ({
  type: 'ADD_ADDRESS',
  address,
  itemId,
});
