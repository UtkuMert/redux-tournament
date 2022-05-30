import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../api/axios";

const initialState = {
  stages: [],
  status: "idle",
  error: null,
};

export const fetchStages = createAsyncThunk(
  "/stages/get/list",
  async (initialStage) => {
    try {
      const tournamentId = initialStage;
      if (tournamentId) {
        const response = await axios.get(
          `/stages/get/list?tournamentId=${tournamentId}`
        );
        console.log(response?.data);
        return response?.data;
      }
      const response = await axios.get(`/stages/get/list`);
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchStagesById = createAsyncThunk(
  "/stages/get/list",
  async (initialStage) => {
    try {
      const { tournamentId } = initialStage;
      console.log(tournamentId);
      const response = await axios.get(
        `/stages/get/list/
      ${tournamentId}`,
        initialStage
      );
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewStage = createAsyncThunk(
  "/stages/save",
  async (initialStage) => {
    try {
      const { tournamentId } = initialStage;
      console.log(tournamentId);
      const response = await axios.post(
        `/stages/save/${tournamentId}`,
        initialStage
      );
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateStage = createAsyncThunk(
  "/stages/update",
  async (initialStage) => {
    try {
      const { id } = initialStage;
      const response = await axios.put(`/stages/update/${id}`, initialStage);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteStage = createAsyncThunk(
  "/delete/{stageId}",
  async (initialStage) => {
    const { id } = initialStage;
    try {
      const response = await axios.delete(`/stages/delete/${id}`);
      if (response?.status === 200) return initialStage;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const stageSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stages = action?.payload?.data;
      })
      .addCase(fetchStages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewStage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.stages.push(action.payload);
      })
      .addCase(updateStage.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const stages = state.stages.filter((stage) => stage.id !== id);
        state.stage = [...stages, action.payload];
        console.log(action.payload);
      })
      .addCase(deleteStage.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const stages = state.stages.filter((stage) => stage?.id !== id);
        state.stages = stages;
      });
  },
});

export const selectAllStages = (state) => state?.stages?.stages;
export const getStagesStatus = (state) => state?.stages?.status;
export const getStagesError = (state) => state?.stages?.error;

export const selectStageById = (state, id) =>
  state.stages.stages.find((stage) => stage.id === id);

export const selectStageByTournamentId = (state, id) =>
  state?.stages?.stages?.filter((stage) => stage?.tournamentId === id);
export default stageSlice.reducer;
