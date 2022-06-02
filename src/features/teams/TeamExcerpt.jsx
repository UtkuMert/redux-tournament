import { Link } from "react-router-dom";
import { Table, Group } from "@mantine/core";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTeam } from "./teamSlice";
import { IoIosAddCircle } from "react-icons/io";

export function TeamExcerpt({ teams }) {
  const dispatch = useDispatch();

  const onDeleteTeamClicked = (id) => {
    try {
      dispatch(deleteTeam({ id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the team", err);
    }
  };
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
        {teams?.map((team,index) => (
          <tr key={team?.id}>
            <td>{index}</td>
            <td>{team?.teamName}</td>
            <td>{team?.tournamentId}</td>
            <td>
              {" "}
              <Link to={`/team/${team?.id}`}>
                {" "}
                <button className="btn btn-sm btn-info">View Team</button>
              </Link>
            </td>
            <td>
              <Link to={`/team/addplayer/${team?.id}`}>
                {" "}
                <button className="btn btn-sm btn-outline">
                  Add Player
                  <IoIosAddCircle />
                </button>
              </Link>
            </td>
            <td>
              <Group position="center">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    onDeleteTeamClicked(team.id);
                  }}
                >
                  <MdCancel />
                </button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
