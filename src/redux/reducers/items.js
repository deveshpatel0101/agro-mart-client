const itemsReducerDefaultState = [];

export default (state = itemsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'REMOVE_ITEM':
      return state.filter((item) => item.itemId !== action.itemId);
    case 'EDIT_ITEM':
      return state.map((item) =>
        item.itemId === action.itemId ? { ...item, ...action.updates } : item,
      );
    case 'ADD_ITEM_ARR':
      return action.items;
    case 'SHARED_ITEM':
      return state.map((item) =>
        item.itemId === action.itemId ? { ...item, shared: !item.shared } : item,
      );
    case 'ADD_ADDRESS':
      return state.map((item) =>
        item.itemId === action.itemId ? { ...item, address: action.address } : item,
      );
    default:
      return state;
  }
};
