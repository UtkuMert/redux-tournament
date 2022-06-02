import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../api/axios";

const initialState = {
  scorePlayers: [],
  status: "idle",
  error: null,
};

export const fetchScorePlayers = createAsyncThunk(
  "/scoreplayers/get/list",
  async () => {
    try {
      const response = await axios.get("/scoreplayers/get/list");
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const addNewScorePlayers = createAsyncThunk(
  "/scoreplayers/save",
  async (initialScore) => {
    try {
      const response = await axios.post("/scoreplayers/save", initialScore);
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);
const scorePlayerSlice = createSlice({
  name: "scorePlayers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchScorePlayers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchScorePlayers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.scorePlayers = action?.payload?.data;
      })
      .addCase(fetchScorePlayers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewScorePlayers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.scorePlayers.push(action.payload);
      })
  },
});
export const selectAllScorePlayers = (state) => state?.scorePlayers?.scorePlayers;
export const getScorePlayersStatus = (state) => state?.scorePlayers?.status;
export const getScorePlayersError = (state) => state?.scorePlayers?.error;
export default scorePlayerSlice.reducer;
