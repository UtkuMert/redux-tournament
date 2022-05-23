import { Link } from "react-router-dom";
import { TeamTournament } from "./TeamTournament";
import { Table } from "@mantine/core";

export function TeamExcerpt({ teams }) {
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>Team Id</th>
          <th>Team Name</th>
          <th>Tournament id</th>
        </tr>
      </thead>
      <tbody>
        {teams?.map((team) => (
          <tr key={team.id}>
            <td>{team.id}</td>
            <td>{team.teamName}</td>
            <td>{team.tournamentId}</td>
            <td>
              {" "}
              <Link to={`tournament/${team.id}`}>View Team</Link>
            </td>
            <td>
              <Link to={`tournament/addteam/${team.id}`}>Add Player</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

{
  /* <div key={team.id} className="card bg-base-100 shadow-xl w-96">
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
</div> */
}
