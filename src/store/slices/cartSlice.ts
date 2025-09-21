
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  seller: string;
  category: string;
  type: 'product' | 'service';
  // Service-specific fields
  serviceDate?: string;
  serviceTime?: string;
  salonId?: string;
  employeeId?: string;
  duration?: number;
  // Product-specific fields
  supplierId?: string;
  companyId?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  currency: 'BRL' | 'Mumbuca';
}

const initialState: CartState = {
  items: [],
  total: 0,
  currency: 'BRL',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setCurrency: (state, action: PayloadAction<'BRL' | 'Mumbuca'>) => {
      state.currency = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCurrency } = cartSlice.actions;
export default cartSlice.reducer;
