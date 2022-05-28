import { configureStore, createSlice } from "@reduxjs/toolkit";
import tournamentsReducer from "../features/tournaments/tournamentSlice";
import teamsReducer from "../features/teams/teamSlice";
import playerReducer from "../features/players/playerSlice";
import stageReducer from "../features/stages/stageSlice";
import stageTeamReducer from "../features/stageTeam/stageTeamSlice";
import gamePlayReducer from "../features/gamePlay/gamePlaySlice";
export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
    teams: teamsReducer,
    players: playerReducer,
    stages: stageReducer,
    stageTeam: stageTeamReducer,
    gamePlay: gamePlayReducer,
  },
});
