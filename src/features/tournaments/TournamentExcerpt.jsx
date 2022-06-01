import { Link } from "react-router-dom";
import { useState } from "react";
import { Table, Modal, Button, Group } from "@mantine/core";
import { AddStageFrom } from "../stages/AddStageFrom";
export const TournamentExcerpt = ({ tournaments }) => {
  const [opened, setOpened] = useState(false);
  const [tournamentId, setTournamentId] = useState("");

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
        {tournaments?.map((tournament) => (
          <tr key={tournament.id}>
            <td>{tournament.id}</td>
            <td>{tournament.tournamentName}</td>
            <td>{tournament.description}</td>
            <td>
              {" "}
              <Link to={`tournament/${tournament.id}`}>
                <button className="btn btn-sm btn-info">View Tournament</button>
              </Link>
            </td>
            <td>
              <Link to={`tournament/addteam/${tournament.id}`}>
                {" "}
                <button className="btn btn-sm btn-outline btn-accent">
                  Add Team
                </button>
              </Link>
            </td>
            <td>
              {" "}
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Introduce yourself!"
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
