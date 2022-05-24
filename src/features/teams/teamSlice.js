import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  teams: [],
  status: "idle",
  error: null,
};

export const fetchTeams = createAsyncThunk("/teams/get/list", async () => {
  try {
    const response = await axios.get("/teams/get/list");
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewTeam = createAsyncThunk(
  "/teams/save/",
  async (initialTeam) => {
    try {
      const { id } = initialTeam;
      const response = await axios.post(`/teams/save/${id}`, initialTeam);
      console.log(response?.data);
      return response?.data.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateTeam = createAsyncThunk(
  "/teams/update",
  async (initialTeam) => {
    try {
      const { id } = initialTeam;
      const response = await axios.put(`/teams/update/${id}`, initialTeam);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    teamAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name) {
        return {
          payload: {
            name,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTeams.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.teams = action?.payload?.data;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTeam.fulfilled, (state, action) => {
        console.log(action.payload);
        return { ...state, teams: [...state.teams, action.payload] };
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const teams = state.teams.filter(
          (team) => team.id !== id
        );
        state.team = [...teams, action.payload];
        console.log(action.payload);
      });
  },
});

export const selectAllTeams = (state) => state.teams.teams;
export const getTeamsStatus = (state) => state.teams.status;
export const getTeamsError = (state) => state.teams.error;

export const selectTeamById = (state, id) =>
  state.teams.teams.find((team) => team.id === id); //Takim bulunuyor.
export const { teamAdded } = teamSlice.actions;
export default teamSlice.reducer;
