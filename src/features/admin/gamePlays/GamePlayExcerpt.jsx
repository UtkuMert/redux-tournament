import { useState } from "react";
import { Table, Modal, Button, Group } from "@mantine/core";
import { AddGamePerformanceForm } from "../gamePerformances/AddGamePerformanceForm";

export const GamePlayExcerpt = ({ gamePlays }) => {
  const [opened, setOpened] = useState(false);
  const [gameToPlayId, setGameToPlayId] = useState("");
  const [firstTeamName, setFirstTeamName] = useState("");
  const [secondTeamName, setSecondTeamName] = useState("");
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>First Team</th>
          <th>V</th>
          <th>Second Team</th>
        </tr>
      </thead>
      <tbody>
        {gamePlays?.map((gamePlay) => (
          <tr key={gamePlay?.id}>
            <td>{gamePlay?.firstTeamName}</td>
            <td> V </td>
            <td>{gamePlay?.secondTeamName}</td>
            <td>
              {" "}
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Edit Score"
              >
                <AddGamePerformanceForm
                  gameToPlayId={gameToPlayId}
                  firstTeamName={firstTeamName}
                  secondTeamName={secondTeamName}
                />
              </Modal>
              <Group position="center">
                <Button
                  onClick={() => {
                    setOpened(true);
                    setGameToPlayId(gamePlay?.id);
                    setFirstTeamName(gamePlay?.firstTeamName);
                    setSecondTeamName(gamePlay?.secondTeamName);
                  }}
                >
                  Edit Score
                </Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
