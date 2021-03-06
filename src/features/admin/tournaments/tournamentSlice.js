import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../api/axios";

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
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewTournament = createAsyncThunk(
  "/tournaments/save",
  async (initialTournament, { rejectWithValue }) => {
    console.log("eklendi", initialTournament);
    try {
      const response = await axios.post("/tournaments/save", initialTournament);
      return response?.data?.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }

      return rejectWithValue(err?.response.data);
    }
  }
);

export const updateTournament = createAsyncThunk(
  "/tournaments/update",
  async (initialTournament) => {
    try {
      const { id } = initialTournament;
      const response = await axios.put(
        `/tournaments/update/${id}`,
        initialTournament
      );
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const deleteTournament = createAsyncThunk(
  "/delete/{tournamentId}",
  async (initialTournament) => {
    const { id } = initialTournament;
    try {
      const response = await axios.delete(`/tournaments/delete/${id}`);
      if (response?.status === 200) return initialTournament;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const tournamentSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {},
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
      .addCase(addNewTournament.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewTournament.fulfilled, (state, action) => {
        return { ...state, tournaments: [...state.tournaments, action.payload] };
      })
      .addCase(addNewTournament.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTournament.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTournament.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const tournaments = state.tournaments.filter(
          (tournament) => tournament.id !== id
        );
        state.tournament = [...tournaments, action.payload];
        console.log(action.payload);
      })
      .addCase(updateTournament.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTournament.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTournament.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const tournaments = state.tournaments.filter(
          (tournament) => tournament?.id !== id
        );
        state.tournaments = tournaments;
      })
      .addCase(deleteTournament.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllTournaments = (state) => state?.tournaments?.tournaments;
export const getTournamentsStatus = (state) => state?.tournaments?.status;
export const getTournamentsError = (state) => state?.tournaments?.error;

export const selectTournamentById = (state, id) =>
  state.tournaments.tournaments.find((tournament) => tournament.id === id); //Turnuva bulunuyor.

export default tournamentSlice.reducer;
