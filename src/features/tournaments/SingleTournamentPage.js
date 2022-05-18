import { useSelector } from "react-redux";
import { selectTournamentById } from "./tournamentSlice";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const SingleTournamentPage = () => {
  const { id } = useParams();

  const tournament = useSelector((state) => selectTournamentById(state, Number(id)))

  if (!tournament) {
    return (
      <section>
        <h2>tournament not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <Link to={`/tournament/edit/${id}`}>Edit Tournament</Link>
      <h2>{tournament.tournamentName}</h2>
      <p>{tournament.description}</p>
    </article>
  );
};
