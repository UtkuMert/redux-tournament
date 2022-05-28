import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'flowbite';

import { fetchTournaments } from "./features/tournaments/tournamentSlice";
import { fetchTeams } from "./features/teams/teamSlice";
import { fetchStages } from "./features/stages/stageSlice";
import { fetchStageTeams } from "./features/stageTeam/stageTeamSlice";


store.dispatch(fetchTournaments());
store.dispatch(fetchTeams());
store.dispatch(fetchStages());
store.dispatch(fetchStageTeams());

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
