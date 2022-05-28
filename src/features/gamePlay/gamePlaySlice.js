import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../api/axios";

const initialState = {
  gameToPlay: [],
  status: "idle",
  error: null,
};

export const fetchGameToPlay = createAsyncThunk(
  "/gametoplay/get/list",
  async () => {
    try {
      const response = await axios.get("/gametoplay/get/list");
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
      const response = await axios.post("/gamestoplay/save", initialMatch);
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);

const gamePlaySlice = createSlice({
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
        state.gamePlays.push(action.payload);
      });
  },
});



export default gamePlaySlice.reducer;
