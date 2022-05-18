import { useSelector } from "react-redux";
import { selectTournamentById } from "./tournamentSlice";

import { useParams } from "react-router-dom";

export const SingleTournamentPage = () => {
  const { id } = useParams();
  console.log(id);
  const tournament = useSelector((state) =>{
      console.log('State', state);
      return selectTournamentById(state, Number(id))
  }
  );

  console.log(tournament);
  if (!tournament) {
    return (
      <section>
        <h2>tournament not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <p>GIRDI</p>
      <h2>{tournament.tournamentName}</h2>
      <p>{tournament.description}</p>
    </article>
  );
};
