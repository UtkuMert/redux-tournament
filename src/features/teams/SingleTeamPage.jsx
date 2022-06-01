import { useSelector } from "react-redux";
import { selectTeamById } from "./teamSlice";
import {selectPlayersListByTeamId} from "../playersList/playerListSlice"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ConfirmPlayerExcerpt } from "../playersList/ConfirmPlayerExcerpt";
export const SingleTeamPage = () => {
  const { id } = useParams();

  const team = useSelector((state) => selectTeamById(state, Number(id)));
  const players = useSelector((state)=> selectPlayersListByTeamId(state, Number(team?.id)));

  if (!team) {
    return (
      <section>
        <h2>team not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <Link to={`/team/edit/${id}`}>Edit Team</Link>
      <h2>{team.teamName}</h2>
      <ConfirmPlayerExcerpt players={players}/>
    </article>
  );
};
