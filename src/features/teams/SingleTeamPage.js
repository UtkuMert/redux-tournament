import { useSelector } from "react-redux";
import { selectTeamById } from "./teamSlice";

import { useParams } from "react-router-dom";

export const SingleTeamPage = () => {
    const { id } = useParams();
    console.log(id);
    const team = useSelector((state) =>{
        console.log('State', state.teams);
        return selectTeamById(state, Number(id))
    }
    );
  
    console.log(team);
    if (!team) {
      return (
        <section>
          <h2>team not found!</h2>
        </section>
      );
    }
  
    return (
      <article>
        <p>GIRDI</p>
        <h2>{team.teamName}</h2>
      </article>
    );
}

