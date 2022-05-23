import { configureStore } from "@reduxjs/toolkit";
import tournamentsReducer from '../features/tournaments/tournamentSlice'
import teamsReducer from '../features/teams/teamSlice'
import playerReducer from "../features/players/playerSlice"

export const store = configureStore({
    reducer: {
        tournaments: tournamentsReducer,
        teams: teamsReducer,
        players: playerReducer
    }
})