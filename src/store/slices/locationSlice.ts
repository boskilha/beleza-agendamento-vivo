
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  userLocation: {
    lat: number;
    lng: number;
  } | null;
  selectedLocation: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  isLocationEnabled: boolean;
}

const initialState: LocationState = {
  userLocation: null,
  selectedLocation: null,
  isLocationEnabled: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.userLocation = action.payload;
      state.isLocationEnabled = true;
    },
    setSelectedLocation: (state, action: PayloadAction<{ lat: number; lng: number; address: string }>) => {
      state.selectedLocation = action.payload;
    },
    clearLocation: (state) => {
      state.userLocation = null;
      state.selectedLocation = null;
      state.isLocationEnabled = false;
    },
  },
});

export const { setUserLocation, setSelectedLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
