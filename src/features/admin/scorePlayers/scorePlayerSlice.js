import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../api/axios";

const initialState = {
  scorePlayers: [],
  status: "idle",
  error: null,
};

export const fetchScorePlayers = createAsyncThunk(
  "/scoresplayers/get/list",
  async () => {
    try {
      const response = await axios.get("/scoresplayers/get/list");
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const addNewScorePlayers = createAsyncThunk(
  "/scoresplayers/save",
  async (initialScore) => {
    console.log("BURADYIM", initialScore)
    try {
      const response = await axios.post("/scoresplayers/save", {
        playerId: initialScore?.value,
        scoreId : initialScore?.id
      });
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

export const selectScorePlayerByScoreId = (state, id) =>
  state.scorePlayers?.scorePlayers?.filter((scorePlayer) => scorePlayer?.scoreId === id); //Turnuva idsine gore team geliyor.

export default scorePlayerSlice.reducer;
