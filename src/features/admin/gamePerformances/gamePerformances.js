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

export const updateGamePerformance = createAsyncThunk(
  "/gamesperformed/update",
  async (initialPerformance) => {
    const id = initialPerformance.gamePerformanceId;
    console.log("Aaaaaaa",initialPerformance);
    try {
      const response = await axios.post(
        `/gamesperformed/update/${id}`,
        initialPerformance
      );
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
      })
      .addCase(updateGamePerformance.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const gamePerformances = state.gamePerformances.filter((gamePerformance) => gamePerformance.id !== id);
        state.gamePerformance = [...gamePerformances, action.payload];
        console.log(action.payload);
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

  export const selectGamePerformedByGameToPlayId = (state, id) =>
  state.gamePerformances?.gamePerformances?.find((gamePerformance) => gamePerformance?.gameToPlayId === id); //Takim bulunuyor.
export default gamePerformancesSlice.reducer;
