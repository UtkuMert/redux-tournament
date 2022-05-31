import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  players: [],
  status: "idle",
  error: null,
};

export const fetchPlayers = createAsyncThunk(
  "/playertoadd/get/list",
  async () => {
    try {
      const response = await axios.get("/playertoadd/get/list");
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchPlayersByTeamId = createAsyncThunk(
  "/teams/get/list/tournamentId",
  async (initialTeam) => {
    try {
      const { id } = initialTeam;
      const response = await axios.get(`/teams/get/list/${id}`, initialTeam);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewPlayer = createAsyncThunk(
  "/playertoadd/save/{teamId}",
  async (initialPlayer) => {
    try {
      const { id } = initialPlayer;
      const response = await axios.post(
        `/playertoadd/save/${id}`,
        initialPlayer
      );
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateNewPlayer = createAsyncThunk(
  "/playertoadd/update/{id}",
  async (initialPlayer) => {
    try {
      const { id } = initialPlayer;
      const response = await axios.put(
        `/playertoadd/update/${id}`,
        initialPlayer
      );
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePlayer = createAsyncThunk(
  "/delete/{id}",
  async (initialPlayer) => {
    const { id } = initialPlayer;
    try {
      const response = await axios.delete(`/playertoadd/delete/${id}`);
      if (response?.status === 200) return initialPlayer;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlayers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.players = action?.payload?.data;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPlayer.fulfilled, (state, action) => {
        console.log(action.payload);
        return { ...state, players: [...state.players, action.payload] };
      })
      .addCase(updateNewPlayer.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const players = state.players.filter((player) => player.id !== id);
        state.player = [...players, action.payload];
        console.log(action.payload);
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const players = state.players.filter((player) => player?.id !== id);
        state.players = players;
      });
  },
});

export const selectAllPlayers = (state) => state?.players?.players;
export const getPlayersStatus = (state) => state?.players?.status;
export const getPlayersError = (state) => state?.teams?.error;

export const selectPlayerById = (state, id) =>
  state.players.players.find((player) => player.id === id); //Takim bulunuyor.

export default playerSlice.reducer;
