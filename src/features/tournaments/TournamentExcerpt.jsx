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
              <Link to={`tournament/${tournament.id}`}>View Tournament</Link>
            </td>
            <td>
              <Link to={`tournament/addteam/${tournament.id}`}>Add Team</Link>
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
                <Button onClick={() => {
                  setOpened(true);
                  setTournamentId(tournament.id)
                }}>Add Stage</Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
