import { Link } from "react-router-dom";
import { useState } from "react";
import { Table, Modal, Group } from "@mantine/core";
import { AddStageFrom } from "../stages/AddStageFrom";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTournament } from "./tournamentSlice";
import { AddTeamForm } from "../teams/AddTeamForm";
export const TournamentExcerpt = ({ tournaments }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [openedTeam, setOpenedTeam] = useState(false);
  const [tournamentId, setTournamentId] = useState("");
  const onDeleteTournamentClicked = (id) => {
    try {
      console.log(id);
      dispatch(deleteTournament({ id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the tournament", err);
    }
  };
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>Tournament Id</th>
          <th>Tournament Name</th>
          <th>Tournament Description</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tournaments?.map((tournament) => (
          <tr key={tournament.id}>
            <td>{tournament.id}</td>
            <td>{tournament.tournamentName}</td>
            <td>{tournament.description}</td>
            <td>
              {" "}
              <Link to={`/admin/tournament/${tournament?.id}`}>
                <button className="btn btn-sm btn-info">View Tournament</button>
              </Link>
            </td>
            <td>
              <Modal
                opened={openedTeam}
                onClose={() => setOpenedTeam(false)}
                title="Add New Stage"
              >
                <AddTeamForm tournamentId={tournamentId} />
              </Modal>{" "}
              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  setOpenedTeam(true);
                  setTournamentId(tournament.id);
                }}
              >
                Add Team
                <IoIosAddCircle />
              </button>
            </td>
            <td>
              {" "}
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add New Stage"
              >
                <AddStageFrom tournamentId={tournamentId} />
              </Modal>
              <Group position="center">
                <button
                  className="btn btn-sm btn-outline btn-accent"
                  onClick={() => {
                    setOpened(true);
                    setTournamentId(tournament.id);
                  }}
                >
                  Add Stage
                </button>
              </Group>
            </td>
            <td>
              <Group position="center">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    console.log(tournament.id);
                    onDeleteTournamentClicked(tournament.id);
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
};
