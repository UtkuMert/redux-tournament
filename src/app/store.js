import { configureStore, createSlice } from "@reduxjs/toolkit";
import tournamentsReducer from "../features/admin/tournaments/tournamentSlice";
import teamsReducer from "../features/admin/teams/teamSlice";
import playerReducer from "../features/admin/players/playerSlice";
import stageReducer from "../features/admin/stages/stageSlice";
import stageTeamsReducer from "../features/admin/stageTeams/stageTeamsSlice";
import gamePlaysReducer from "../features/admin/gamePlays/gamePlaysSlice";
import gamePerformancesReducer from "../features/admin/gamePerformances/gamePerformances";
import playerListReducer from "../features/admin/playersList/playerListSlice"
import scorePlayerReducer from "../features/admin/scorePlayers/scorePlayerSlice"
export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
    teams: teamsReducer, 
    players: playerReducer,
    playersList: playerListReducer,
    stages: stageReducer,
    stageTeams: stageTeamsReducer,
    gamePlays: gamePlaysReducer,
    gamePerformances: gamePerformancesReducer,
    scorePlayers: scorePlayerReducer 
  },
});
