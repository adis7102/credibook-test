import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '..';

export const HomeSlice = createSlice({
  name: 'home',

  initialState: {
    movieList: [],
    totalPage: 0
  },

  reducers: {
    setMovieList: (state, action) => {
      state.movieList = action.payload
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.movieList = action.payload.home.movieList
      state.totalPage = action.payload.home.totalPage
    }
  }
});

export const { setMovieList, setTotalPage } = HomeSlice.actions;

export const getHomeData = (state: AppState) => state.home;

export default HomeSlice.reducer;