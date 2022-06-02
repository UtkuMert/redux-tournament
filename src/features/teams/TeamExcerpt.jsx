import { Link } from "react-router-dom";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTeam } from "./teamSlice";
import { IoIosAddCircle } from "react-icons/io";
import { AddPlayerForm } from "../players/AddPlayerForm";
import { Table, Modal, Group } from "@mantine/core";

export function TeamExcerpt({ teams }) {
  const dispatch = useDispatch();


  const [opened, setOpened] = useState(false);
  const [teamId, setTeamId] = useState("");

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
        {teams?.map((team, index) => (
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
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add New Player"
              >
                <AddPlayerForm teamId={teamId} />
              </Modal>{" "}
              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  setOpened(true);
                  setTeamId(team?.id);
                }}
              >
                Add Player
                <IoIosAddCircle />
              </button>
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
