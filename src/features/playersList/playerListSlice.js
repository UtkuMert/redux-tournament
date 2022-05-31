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
    console.log(initialPlayer)
      const playerToAddDtoId = initialPlayer;
      console.log("ben",playerToAddDtoId.value)
    try {
      const response = await axios.post(`/players/save?playerToAddDtoId=${playerToAddDtoId}`);
      return response?.data?.data;
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
      });
  },
});

export const selectAllPlayersList = (state) => state?.playersList?.playersList;
export const getPlayersListStatus = (state) => state?.playersList?.status;
export const getPlayersListError = (state) => state?.playersList?.error;

export default playerListSlice.reducer