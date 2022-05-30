import { useState } from "react";
import { Table, Modal, Button, Group } from "@mantine/core";
import { AddGamePerformanceForm } from "../gamePerformances/AddGamePerformanceForm";

export const GamePlayExcerpt = ({ gamePlays }) => {
  const [opened, setOpened] = useState(false);
  const [gamePlayId, setGamePlayId] = useState("");
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
                title="Introduce yourself!"
              >
                <AddGamePerformanceForm />
              </Modal>
              <Group position="center">
                <Button
                  onClick={() => {
                    setOpened(true);
                    setGamePlayId(gamePlay?.id);
                  }}
                >
                  Add Stage
                </Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

{
  /* <div>
      {" "}
      <div>
        {gamePlays.map((gamePlay) => (
          <p key={gamePlay.id}>
            {gamePlay.firstTeamName} --- {gamePlay.secondTeamName}
          </p>
        ))}
      </div>
    </div> */
}
