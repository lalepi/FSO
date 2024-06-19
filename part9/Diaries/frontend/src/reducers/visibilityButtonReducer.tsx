import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  status: "All",
};

export const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    VisibilityButtonChange: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { VisibilityButtonChange } = visibilitySlice.actions;

export default visibilitySlice.reducer;
