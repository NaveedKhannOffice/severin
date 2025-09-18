export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const INCREASE_QTY = "INCREASE_QTY";
export const DECREASE_QTY = "DECREASE_QTY";


export const setData = (data) => {
  return {
    type: "SET_DATA",
    payload: data,
  };
};

export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: token, 
});

export const setRoles = (role) => ({
  type: "SET_ROLE",
  payload: role,
});

export const resetCartData = () => ({
  type: "RESET_CART_DATA",
});

export const addImage = (name, dataURL) => ({
  type: "ADD_IMAGE",
  payload: { name, dataURL },
});

export const deleteAllImages = () => {
  sessionStorage.removeItem("images"); // Clear sessionStorage
  return {
    type: "DELETE_ALL_IMAGES",
  };
};

export const addItem = (productData) => ({
  type: ADD_ITEM,
  payload: productData,
});


export const removeItem = (cartItemId) => ({
  type: REMOVE_ITEM,
  payload: cartItemId,
});

export const increaseQty = (id) => ({
  type: INCREASE_QTY,
  payload: id,
});

export const decreaseQty = (id) => ({
  type: DECREASE_QTY,
  payload: id,
});

export const logout = () => ({ type: "LOGOUT" });

