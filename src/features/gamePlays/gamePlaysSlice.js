import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../api/axios";

const initialState = {
  gamePlays: [],
  status: "idle",
  error: null,
};

export const fetchGameToPlay = createAsyncThunk(
  "/gametoplay/get/list",
  async () => {
    try {
      const response = await axios.get("/gamestoplay/get/list");
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const matchTeams = createAsyncThunk(
  "/gamestoplay/save",
  async (initialMatch) => {
    try {
      console.log(initialMatch);
      const response = await axios.post("/gamestoplay/save", initialMatch);
      console.log(response?.data)
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);

const gamePlaysSlice = createSlice({
  name: "gamePlays",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGameToPlay.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGameToPlay.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.gamePlays = action?.payload?.data;
      })
      .addCase(fetchGameToPlay.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(matchTeams.fulfilled, (state, action) => {
        console.log(action.payload);
        state?.gamePlays?.push(action.payload);
      });
  },
});


export const selectAllGamePlays = (state) => state?.gamePlays?.gamePlays;
export const getGamePlaysStatus = (state) => state?.gamePlays?.status;
export const getGamePlaysError = (state) => state?.gamePlays?.error;
export default gamePlaysSlice.reducer;
