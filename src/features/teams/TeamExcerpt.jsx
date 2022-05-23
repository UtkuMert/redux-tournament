import { Link } from "react-router-dom";
import { TeamTournament } from "./TeamTournament";
export function TeamExcerpt({team}) {
  return (
    <div key={team.id} className="card bg-base-100 shadow-xl w-96">
    <figure>
      <img
        src="https://api.lorem.space/image/shoes?w=400&h=225"
        alt="Shoes"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{team.teamName}</h2>
      <TeamTournament tournamentId={team.tournamentId} />
      <Link to={`team/${team.id}`}>View Team</Link>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Team Details</button>
      </div>
    </div>
  </div>
  )
}

