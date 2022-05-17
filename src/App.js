import { TournamentList } from "./features/tournaments/TournamentList";
import { TeamList } from "./features/teams/TeamList.jsx";
import { AddTournamentForm } from "./features/tournaments/AddTournamentForm";
import { AddTeamForm } from "./features/teams/AddTeamForm";

export default function App() {
  return (
    <main className="App">
      <AddTournamentForm />
      <TournamentList />
      <AddTeamForm />
      <TeamList />
    </main>
  );
}
