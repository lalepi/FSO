import { configureStore } from "@reduxjs/toolkit";

import weatherButtonReducer from "./reducers/weatherButtonReducer";
import visibilityButtonReducer from "./reducers/visibilityButtonReducer";

const store = configureStore({
  reducer: {
    weather: weatherButtonReducer,
    visibility: visibilityButtonReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;

export default store;
