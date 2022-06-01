import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  playersList: [],
  status: "idle",
  error: null,
};

export const fetchPlayersList = createAsyncThunk(
  "/players/get/list",
  async () => {
    try {
      const response = await axios.get("/players/get/list");
      console.log(response?.data);
      return response?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const ConfirmPlayers = createAsyncThunk(
  "/players/save",
  async (initialPlayer) => {
    const playerToAddDtoId = initialPlayer?.playerId;

    try {
      const response = await axios.post(
        `/players/save?playerToAddDtoId=${playerToAddDtoId}`
      );
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateConfirmedPlayer = createAsyncThunk(
  "/players/update/{id}",
  async (initialPlayer) => {
    try {
      const { playerId } = initialPlayer;
      const response = await axios.put(`/players/update/${playerId}`, initialPlayer);
      return response?.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const deleteConfirmedPlayer = createAsyncThunk(
  "/delete/{id}",
  async (initialPlayer) => {
    const { playerId } = initialPlayer;
    try {
      const response = await axios.delete(`/players/delete/${playerId}`);
      if (response?.status === 200) return initialPlayer;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);
const playerListSlice = createSlice({
  name: "playersList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlayersList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlayersList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playersList = action?.payload?.data;
      })
      .addCase(fetchPlayersList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(ConfirmPlayers.fulfilled, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          playersList: [...state.playersList, action.payload],
        };
      })
      .addCase(updateConfirmedPlayer.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const playersList = state.playersList.filter(
          (player) => player.id !== id
        );
        state.player = [...playersList, action.payload];
        console.log(action.payload);
      })
      .addCase(deleteConfirmedPlayer.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const playersList = state.playersList.filter((player) => player?.id !== id);
        state.players = playersList;
      });
  },
});

export const selectAllPlayersList = (state) => state?.playersList?.playersList;
export const getPlayersListStatus = (state) => state?.playersList?.status;
export const getPlayersListError = (state) => state?.playersList?.error;
export const selectPlayerListById = (state, id) =>
  state.playersList.playersList.find((player) => player.id === id); //Takim bulunuyor.

export const selectPlayersListByTeamId = (state, id) =>
  state?.playersList?.playersList?.filter((player) => player.teamId === id); //Turnuva idsine gore team geliyor.
export default playerListSlice.reducer;
