import { configureStore, createSlice } from "@reduxjs/toolkit";
import tournamentsReducer from "../features/tournaments/tournamentSlice";
import teamsReducer from "../features/teams/teamSlice";
import playerReducer from "../features/players/playerSlice";
import stageReducer from "../features/stages/stageSlice";
import stageTeamsReducer from "../features/stageTeams/stageTeamsSlice";
import gamePlaysReducer from "../features/gamePlays/gamePlaysSlice";
export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
    teams: teamsReducer, 
    players: playerReducer,
    stages: stageReducer,
    stageTeams: stageTeamsReducer,
    gamePlays: gamePlaysReducer,
  },
});
