import { TeamList } from "./features/teams/TeamList.jsx";
import { AddTournamentForm } from "./features/tournaments/AddTournamentForm";
import { AddTeamForm } from "./features/teams/AddTeamForm";
import { EditTournamentForm } from "./features/tournaments/EditTournamentForm";
import { PlayerList } from "./features/players/PlayerList";

import { SingleTournamentPage } from "./features/tournaments/SingleTournamentPage";
import { SingleTeamPage } from "./features/teams/SingleTeamPage";
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { EditTeamForm } from "./features/teams/EditTeamForm";
import { AddPlayerForm } from "./features/players/AddPlayerForm";
import { EditPlayerForm } from "./features/players/EditPlayerForm";
import { StageList } from "./features/stages/StageList";
import { AddStageTeamsForm } from "./features/stageTeams/AddStageTeamsForm";
import { AddTeamsMatchForm } from "./features/gamePlays/AddTeamsMatchForm";
import { StageTeamList } from "./features/stageTeams/StageTeamList";
import {AddStageFrom} from "./features/stages/AddStageFrom.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="tournament">
          <Route index element={<AddTournamentForm />} />
          <Route path=":id" element={<SingleTournamentPage />} />
          <Route path="edit/:id" element={<EditTournamentForm />} />
          <Route path="addteam/:id" element={<AddTeamForm />} />
          <Route path="addstage/:id" element={<AddStageFrom />} />
          <Route path=":id/stage" element={<StageList />} />

        </Route>

        <Route path="team">
          <Route index element={<TeamList />} />
          <Route path=":id" element={<SingleTeamPage />} />
          <Route path="edit/:id" element={<EditTeamForm />} />
          <Route path="addplayer/:id" element={<AddPlayerForm />} />
        </Route>

        <Route path="player">
          <Route index element={<PlayerList />} />
          <Route path="edit/:id" element={<EditPlayerForm />} />
          <Route path="addplayer/:id" element={<AddPlayerForm />} />
        </Route>

        {/* <Route path="stage">
          <Route index element={<StageList />} />
          <Route path="addteamtostage" element={<AddStageTeamsForm />} />
          <Route path="matchteams" element={<AddTeamsMatchForm />} />
        </Route> */}
        <Route path="stageteam">
          <Route index element={<StageTeamList />} />
          <Route path="addteamtostage" element={<AddStageTeamsForm />} />
        </Route>
        <Route path="matchteams" element={<AddTeamsMatchForm />} />
      </Route>
    </Routes>
  );
}
