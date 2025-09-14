import { ADD_ITEM, REMOVE_ITEM, INCREASE_QTY, DECREASE_QTY } from "../actions";

// Define initial cart state
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQty: 0,
};

// Helper function to create unique cart item ID
const createCartItemId = (productId, color, size) => {
  return `${productId}_${color || 'no-color'}_${size || 'no-size'}`;
};

// Cart reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const cartItemId = createCartItemId(action.payload.id, action.payload.color, action.payload.size);
      const existingItem = state.cartItems.find(
        (item) => item.cartItemId === cartItemId
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
          totalQty: state.totalQty + 1,
        };
      } else {
        // Create new cart item with all product details
        const newCartItem = {
          cartItemId: cartItemId,
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          color: action.payload.color,
          size: action.payload.size,
          qty: 1,
          stock_quantity: action.payload.stock_quantity
        };
        
        return {
          ...state,
          cartItems: [...state.cartItems, newCartItem],
          totalQty: state.totalQty + 1,
        };
      }

    case REMOVE_ITEM:
      const itemToRemove = state.cartItems.find(item => item.cartItemId === action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.cartItemId !== action.payload
        ),
        totalQty: state.totalQty - (itemToRemove?.qty || 0),
      };

    case INCREASE_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.cartItemId === action.payload
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
        totalQty: state.totalQty + 1,
      };

    case DECREASE_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.cartItemId === action.payload
            ? { ...item, qty: Math.max(1, item.qty - 1) }
            : item
        ),
        totalQty: Math.max(0, state.totalQty - 1),
      };

    case "RESET_CART_DATA":
      return initialState;

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;
