import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchTournaments } from "./features/admin/tournaments/tournamentSlice";
import { fetchTeams } from "./features/admin/teams/teamSlice";
import { fetchPlayers } from "./features/admin/players/playerSlice";
import { fetchStageTeams } from "./features/admin/stageTeams/stageTeamsSlice";
import { fetchStages } from "./features/admin/stages/stageSlice";
import { fetchPlayersList } from "./features/admin/playersList/playerListSlice";

store.dispatch(fetchTournaments());
store.dispatch(fetchTeams());
store.dispatch(fetchPlayers());
store.dispatch(fetchStageTeams());
store.dispatch(fetchStages());
store.dispatch(fetchPlayersList());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
