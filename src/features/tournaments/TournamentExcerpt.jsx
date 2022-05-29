import { Link } from "react-router-dom";
import { Table } from "@mantine/core";

export const TournamentExcerpt = ({ tournaments }) => {



  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>Tournament Id</th>
          <th>Tournament Name</th>
          <th>Tournament Description</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tournaments?.map(tournament => (
          <tr key={tournament.id}>
          <td>{tournament.id}</td>
          <td>{tournament.tournamentName}</td>
          <td>{tournament.description}</td>
          <td> <Link to={`tournament/${tournament.id}`}>View Tournament</Link></td>
          <td><Link to={`tournament/addteam/${tournament.id}`}>Add Team</Link></td>
          <td><Link to={`tournament/addstage/${tournament.id}`}>Add Stage</Link></td>
        </tr>
        ))}
      </tbody>
    </Table>
  );
};
