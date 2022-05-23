import { useSelector } from "react-redux";
import { selectTeamById } from "./teamSlice";

import { useParams } from "react-router-dom";

export const SingleTeamPage = () => {
    const { id } = useParams();
    
 
    const team = useSelector((state) => selectTeamById(state, Number(id)))
   
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

