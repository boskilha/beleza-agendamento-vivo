
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'consumer' | 'lojista' | 'fornecedor' | 'admin';
  mumbucaBalance?: number;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateMumbucaBalance: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.mumbucaBalance = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateMumbucaBalance } = userSlice.actions;
export default userSlice.reducer;
