import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../api/axios";

const initialState = {
  stageTeams: [],
  status: "idle",
  error: null,
};

export const fetchStageTeams = createAsyncThunk(
    "/stageteams/get/list",
    async () => {
      try {
        const response = await axios.get("/stageteam/get/list");
        console.log(response?.data);
        return response?.data;
      } catch (err) {
        return err.message;
      }
    }
  );

  export const addTeamToStage = createAsyncThunk(
    "/stageteam/save",
    async (initialStageTeam) => {
      try {
        const response = await axios.post("/stageteam/save", initialStageTeam); 
        return response?.data?.data;
      } catch (err) {
        return err.message;
      }
    }
  );

  const stageTeamSlice = createSlice({
      name: "stageTeams",
      initialState,
      reducers: {},
      extraReducers(builder){
        builder
        .addCase(fetchStageTeams.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchStageTeams.fulfilled, (state, action) => {
          state.status = "succeeded";
  
          state.stageTeams = action?.payload?.data;
        })
        .addCase(fetchStageTeams.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(addTeamToStage.fulfilled, (state, action) => {
          console.log(action.payload);
          state.stageTeams.push(action.payload);
        });
      }
  })
  export const selectAllStageTeams = (state) => state?.stageTeams?.stageTeams;
  export const getStageTeamsStatus = (state) => state?.stageTeams?.status;
  export const getStageTeamsError = (state) => state?.stageTeams?.error;
  
  export default stageTeamSlice.reducer;
