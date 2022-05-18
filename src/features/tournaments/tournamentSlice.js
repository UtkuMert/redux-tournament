import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  tournaments: [],
  status: "idle",
  error: null,
};

export const fetchTournaments = createAsyncThunk(
  "/tournaments/get/list",
  async () => {
    try {
      const response = await axios.get("/tournaments/get/list");
      //console.log(response?.data?.data[0].tournamentName);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewTournament = createAsyncThunk(
  "/tournaments/save",
  async (initialTournament) => {
    try {
      const response = await axios.post("/tournaments/save", initialTournament);
      console.log(response?.data);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const tournamentSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    tournamentAdded: {
      reducer(state, action) {
        state.tournaments.push(action.payload);
      },
      prepare(title, description, teamId) {
        return {
          payload: {
            title,
            description,
            teamId,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTournaments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.tournaments = action?.payload?.data;
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTournament.fulfilled, (state, action) => {
        console.log(action.payload);
        state.tournaments.push(action.payload);
      });
  },
});
export const selectAllTournaments = (state) => state.tournaments.tournaments;
export const getTournamentsStatus = (state) => state.tournaments.status;
export const getTournamentsError = (state) => state.tournaments.error;

export const selectTournamentById = (state, id) => {
  console.log(state.tournaments.tournaments.find((tournament) => tournament.id === id))
  state.tournaments.tournaments.find((tournament) => tournament.id === id); //Turnuva bulunuyor.
};

export const { tournamentAdded } = tournamentSlice.actions;

export default tournamentSlice.reducer;
