import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  status: "All",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    WeatherButtonChange: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { WeatherButtonChange } = weatherSlice.actions;

export default weatherSlice.reducer;
