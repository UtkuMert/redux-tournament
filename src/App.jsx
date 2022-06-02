import { TeamList } from "./features/admin/teams/TeamList.jsx";
import { AddTournamentForm } from "./features/admin/tournaments/AddTournamentForm";
import { AddTeamForm } from "./features/admin/teams/AddTeamForm";
import { EditTournamentForm } from "./features/admin/tournaments/EditTournamentForm";
import { PlayerList } from "./features/admin/players/PlayerList";

import { SingleTournamentPage } from "./features/admin/tournaments/SingleTournamentPage";
import { SingleTeamPage } from "./features/admin/teams/SingleTeamPage";
import { Layout } from "./pages/Layout";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { EditTeamForm } from "./features/admin/teams/EditTeamForm";
import { AddPlayerForm } from "./features/admin/players/AddPlayerForm";
import { EditPlayerForm } from "./features/admin/players/EditPlayerForm";
import { StageList } from "./features/admin/stages/StageList";
import { AddStageTeamsForm } from "./features/admin/stageTeams/AddStageTeamsForm";
import { AddTeamsMatchForm } from "./features/admin/gamePlays/AddTeamsMatchForm";
import { StageTeamList } from "./features/admin/stageTeams/StageTeamList";
import { AddStageFrom } from "./features/admin/stages/AddStageFrom";
import { GamePlayList } from "./features/admin/gamePlays/GamePlayList";
import { SingleStagePage } from "./features/admin/stages/SingleStagePage.jsx";
import { TournamentList } from "./features/admin/tournaments/TournamentList.jsx";
import { Admin } from "./pages/Admin.jsx";
import { HomeLayout } from "./pages/HomeLayout.jsx";
import HomeTournamentList from "./features/home/tournaments/HomeTournamentList.jsx";
import HomeSingleTournament from "./features/home/tournaments/HomeSingleTournament.jsx";
import { HomeTeamList } from "./features/home/teams/HomeTeamList.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Admin />} />

        <Route path="tournament">
          <Route index element={<TournamentList />} />
          <Route path="addTournament" element={<AddTournamentForm />} />
          <Route path=":id" element={<SingleTournamentPage />} />
          <Route path="edit/:id" element={<EditTournamentForm />} />
          <Route path="addteam/:id" element={<AddTeamForm />} />
          <Route path=":id/stage" element={<StageList />} />
          <Route path=":id/stage/:stageId" element={<SingleStagePage />} />
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

        <Route path="stage">
          <Route index element={<StageList />} />
          <Route path="matchteams" element={<AddTeamsMatchForm />} />
        </Route>
        <Route path="stageteam">
          <Route index element={<StageTeamList />} />
          <Route path="addteamtostage" element={<AddStageTeamsForm />} />
        </Route>
        <Route path="matchteams" element={<AddTeamsMatchForm />} />
        <Route path="gameplay" element={<GamePlayList />} />
      </Route>
      <Route path="/" element={<HomeLayout />}>
        <Route element={<Home />} />

        <Route path="tournaments">
          <Route index element={<HomeTournamentList />} />
          <Route path=":id" element={<HomeSingleTournament />} />
        </Route>
        <Route path="teams">
          <Route index element={<HomeTeamList />} />
          <Route path=":id" element={<SingleTournamentPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
