import { configureStore } from "@reduxjs/toolkit";
import selectedGenresSlice from "./reducers/selectedGenresSlice";

export const store = configureStore({
  reducer: {
    selectedGenres: selectedGenresSlice,
  },
});
