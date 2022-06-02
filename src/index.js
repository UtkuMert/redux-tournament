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

store.dispatch(fetchTournaments());
store.dispatch(fetchTeams());
store.dispatch(fetchPlayers());
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
