import { TournamentList } from "./features/tournaments/TournamentList";
import { AddTournamentForm } from "./features/tournaments/AddTournamentForm";
export default function App() {
  return (
    <main className="App">
      <AddTournamentForm />
      <TournamentList />
    </main>
  );
}
