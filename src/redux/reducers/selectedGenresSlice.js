import { createSlice } from "@reduxjs/toolkit";

export const selectedGenresSlice = createSlice({
  name: "selectedGenres",
  initialState: {
    genres: [], //  영화 장르의 ID 목록
  },
  reducers: {
    addGenre: (state, action) => {
      state.genres = [...state.genres, action.payload];
    },
    removeGenre: (state, action) => {
      state.genres = state.genres.filter(
        (el) => parseInt(el) !== parseInt(action.payload)
      );
    },
  },
});

export const { addGenre, removeGenre } = selectedGenresSlice.actions; // 장르추가, 장르제거

export const selectSelectedGenres = (state) => state.selectedGenres.genres; //  현재 선택된 장르 목록을 표시하거나 다른 상태와 연동하는 데 사용

export default selectedGenresSlice.reducer;
