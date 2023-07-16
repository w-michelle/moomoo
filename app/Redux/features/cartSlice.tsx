import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  cartItemID: string;
  name: string;
  image: string;
  quantity?: number | 1;
  unit_amount: number | null;
};
export type Product = {
  name: string;
  unit_amount: number | null;
  quantity?: number;
  image: string;
  cartItemID: string;
  description: string | null;
};
interface initState {
  cart: CartItem[];
  allItems: Product[];
  paymentIntent: String;
  isCartOpen: boolean;
  onCheckout: string;
}
const initialState: initState = {
  cart: [],
  allItems: [],
  paymentIntent: "",
  isCartOpen: false,
  onCheckout: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAllItems: (state, action: PayloadAction<Product[]>) => {
      state.allItems = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      //check if the item already exist in the cart if it does add if its same cart id if its not add
      const finditem = state.cart.find(
        (item) => item.cartItemID === action.payload.cartItemID
      );
      if (finditem) {
        const updatedCart = state.cart.map((cartItem) => {
          if (cartItem.cartItemID === action.payload.cartItemID) {
            return { ...cartItem, quantity: cartItem.quantity! + 1 };
          }
          return cartItem;
        });
        state.cart = updatedCart;
      } else {
        state.cart = [...state.cart, action.payload];
      }
    },
    removeFromCart: (state, action: PayloadAction<{ cartItemID: string }>) => {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.cartItemID !== action.payload.cartItemID
      );
    },
    increaseCount: (state, action: PayloadAction<{ cartItemID: string }>) => {
      state.cart = state.cart.map((item) => {
        if (item.cartItemID === action.payload.cartItemID) {
          item.quantity!++;
        }
        return item;
      });
    },
    decreaseCount: (state, action: PayloadAction<{ cartItemID: string }>) => {
      state.cart = state.cart.map((item) => {
        if (item.cartItemID === action.payload.cartItemID) {
          item.quantity!--;
        }
        return item;
      });
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setPaymentIntent: (state, action: PayloadAction<string>) => {
      state.paymentIntent = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setCheckout: (state, action: PayloadAction<string>) => {
      state.onCheckout = action.payload;
    },
  },
});

export const selectCart = (state: { cart: initState }) => state.cart.cart;
export const selectCartOpen = (state: { cart: initState }) =>
  state.cart.isCartOpen;
export const selectAllItems = (state: { cart: initState }) =>
  state.cart.allItems;
export const selectPaymentIntent = (state: { cart: initState }) =>
  state.cart.paymentIntent;

export const selectCheckoutStatus = (state: { cart: initState }) =>
  state.cart.onCheckout;

export const {
  setAllItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  setPaymentIntent,
  clearCart,
  setCheckout,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
