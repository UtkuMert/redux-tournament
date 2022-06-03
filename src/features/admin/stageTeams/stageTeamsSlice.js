import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../api/axios";

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
  async (initialStageTeam, rejectWithValue) => {
    try {
      const response = await axios.post("/stageteam/save", {
        teamId: initialStageTeam?.value,
        stageId: initialStageTeam?.stageId,
      });
      console.log(response?.data);
      return response?.data?.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const updateStageTeam = createAsyncThunk(
  "/stageteam/update",
  async (initialStageTeam) => {
    try {
      const { stageId } = initialStageTeam;
      const response = await axios.put(
        `/stageteam/update/${stageId}`,
        initialStageTeam
      );
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const deleteStageTeam = createAsyncThunk(
  "/delete/{stageId}",
  async (initialStageTeam) => {
    const { stageId } = initialStageTeam;
    try {
      const response = await axios.delete(`/stageteam/delete/${stageId}`);
      if (response?.status === 200) return initialStageTeam;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);
const stageTeamsSlice = createSlice({
  name: "stageTeams",
  initialState,
  reducers: {},
  extraReducers(builder) {
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
      .addCase(addTeamToStage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTeamToStage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.stageTeams.push(action.payload);
      })
      .addCase(addTeamToStage.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(updateStageTeam.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateStageTeam.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const stageTeams = state.stageTeams.filter(
          (stageTeam) => stageTeam.id !== id
        );
        state.stageTeam = [...stageTeams, action.payload];
        console.log(action.payload);
      })
      .addCase(updateStageTeam.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteStageTeam.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteStageTeam.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          return;
        }
        const { id } = action.payload;
        const stageTeams = state.stageTeams?.filter((stageTeam) => stageTeam?.id !== id);
        state.stageTeams = stageTeams;
      })
      .addCase(deleteStageTeam.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export const selectAllStageTeams = (state) => state?.stageTeams?.stageTeams;
export const getStageTeamsStatus = (state) => state?.stageTeams?.status;
export const getStageTeamsError = (state) => state?.stageTeams?.error;

export const selectStageTeamByStageId = (state, id) =>
  state?.stageTeams?.stageTeams?.filter(
    (stageTeam) => stageTeam?.stageId === id
  );

export default stageTeamsSlice.reducer;
