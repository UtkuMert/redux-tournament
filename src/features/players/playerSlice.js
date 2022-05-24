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


export const addNewPlayer = createAsyncThunk(
  "/playertoadd/save/{teamId}",
  async (initialPlayer) => {
    try {
      const { id } = initialPlayer;
      const response = await axios.post(`/playertoadd/save/${id}`, initialPlayer);
      return response.data;
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
      });
  },
});

export const selectAllPlayers = (state) => state?.players?.players;
export const getPlayersStatus = (state) => state?.players?.status;
export const getPlayersError = (state) => state?.teams?.error;

export default playerSlice.reducer;
