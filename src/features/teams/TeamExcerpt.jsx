import { Link } from "react-router-dom";
import { Table } from "@mantine/core";

export function TeamExcerpt({ teams }) {
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>Team Id</th>
          <th>Team Name</th>
          <th>Tournament id</th>
          <th></th>
          <th></th>
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
              <Link to={`/team/${team.id}`}>View Team</Link>
            </td>
            <td>
              <Link to={`/team/addplayer/${team.id}`}>Add Player</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
