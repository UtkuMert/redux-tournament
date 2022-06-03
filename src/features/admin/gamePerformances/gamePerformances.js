import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../api/axios";

const initialState = {
  gamePerformances: [],
  status: "idle",
  error: null,
};

export const fetchGamePerformances = createAsyncThunk(
  "/gamesperformed/get/list",
  async () => {
    try {
      const response = await axios.get("/gamesperformed/get/list");
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addGamePerformance = createAsyncThunk(
  "/gamesperformed/save",
  async (initialPerformance) => {
    try {
      const response = await axios.post("/gamesperformed", initialPerformance);
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);

const gamePerformancesSlice = createSlice({
  name: "gamePerformances",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGamePerformances.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGamePerformances.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.gamePerformances = action?.payload?.data;
      })
      .addCase(fetchGamePerformances.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addGamePerformance.fulfilled, (state, action) => {
        console.log(action.payload);
        state.gamePerformances?.push(action?.payload);
      });
  },
});
export const selectAllGamePerformances = (state) =>
  state?.gamePerformances?.gamePerformances;
export const getGamePerformancesStatus = (state) =>
  state?.gamePerformances?.status;
export const getGamePerformancesError = (state) =>
  state?.gamePerformances?.error;

export const selectGamePerformanceById = (state, id) =>
  state.gamePerformances?.gamePerformances?.find(
    (gamePerformance) => gamePerformance.id === id
  ); //Turnuva bulunuyor.

export const selectGamePerformanceByStageId = (state, id) =>
  state.gamePerformances?.gamePerformances?.filter(
    (gamePerformance) => gamePerformance?.stageId === id
  ); //Turnuva idsine gore team geliyor.
export default gamePerformancesSlice.reducer;