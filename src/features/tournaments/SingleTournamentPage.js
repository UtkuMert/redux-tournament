import { selectTournamentById } from "./tournamentSlice";

import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchTeamsByTournamentId, selectTeamByTournamentId } from "../teams/teamSlice";
import { TeamExcerpt } from "../teams/TeamExcerpt";

export const SingleTournamentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tournament = useSelector((state) => selectTournamentById(state, Number(id)))
  
  const teams = useSelector((state) => selectTeamByTournamentId(state, Number(id)));

  useEffect(() => {
    if (teams?.teamsStatus === "idle") {
      dispatch(fetchTeamsByTournamentId({id}));
    }
  }, [teams?.teamsStatus, dispatch]);

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
      <TeamExcerpt teams={teams} />
    </article>
  );
};
