import { Table, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const ConfirmPlayerExcerpt = ({players}) => {

  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>Player Id</th>
          <th>Player Name</th>
          <th>Team id</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {players?.map((player) => (
          <tr key={player.id}>
            <td>{player.id}</td>
            <td>{player.playerFirstName + " " + player.playerLastName}</td>
            <td>{player.teamId}</td>
            <td>{player.position}</td>
            <td>
              {" "}
              <Link to={`player/edit/${player.id}`}>Edit Player</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ConfirmPlayerExcerpt