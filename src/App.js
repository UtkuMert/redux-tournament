import { TournamentList } from "./features/tournaments/TournamentList";
import { TeamList } from "./features/teams/TeamList.jsx";
import { AddTournamentForm } from "./features/tournaments/AddTournamentForm";
import { AddTeamForm } from "./features/teams/AddTeamForm";

import { SingleTournamentPage } from "./features/tournaments/SingleTournamentPage";
import { SingleTeamPage } from "./features/teams/SingleTeamPage";
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TeamList />} />
        
        <Route path="tournament">
          <Route index element={<AddTournamentForm />} />
          <Route path=":id" element={<SingleTournamentPage />} />
          {/* <Route path="edit/:postId" element={<EditPostForm />} /> */}
        </Route>

        <Route path="team">
          <Route index element={<AddTeamForm />} />
          <Route path=":id" element={<SingleTeamPage />} />
          {/* <Route path="edit/:postId" element={<EditPostForm />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}
