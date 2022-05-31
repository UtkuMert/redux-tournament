import { useState } from "react";
import { Table, Modal, Button, Group } from "@mantine/core";
import { AddScorePlayerForm } from "../scorePlayers/AddScorePlayerForm";

export const GamePerformansExcerpt = ({ gamePerformances }) => {
  const [opened, setOpened] = useState(false);
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Team</th>
          <th>Score</th>
          <th>Second Team</th>
        </tr>
      </thead>
      <tbody>
        {gamePerformances?.map((gamePerformance) => (
          <tr key={gamePerformance?.id}>
            <td>{gamePerformance?.id}</td>
            <td>{gamePerformance?.firstTeamName}</td>
            <td>
              {" "}
              {gamePerformance?.scoreOfFirstTeam} -{" "}
              {gamePerformance.scoreOfSecondTeam}{" "}
            </td>
            <td>{gamePerformance?.secondTeamName}</td>
            <td>
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add Team To Stage"
              >
                <AddScorePlayerForm  />
              </Modal>
              <Group position="center">
                <Button
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  Edit Match
                </Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// {" "}
// <Modal
//   opened={opened}
//   onClose={() => setOpened(false)}
//   title="Introduce yourself!"
// >
//   <AddGamePerformanceForm
//     gameToPlayId={gameToPlayId}
//     firstTeamName={firstTeamName}
//     secondTeamName={secondTeamName}
//   />
// </Modal>
// <Group position="center">
//   <Button
//     onClick={() => {
//       setOpened(true);
//       setGameToPlayId(gamePlay?.id);
//       setFirstTeamName(gamePlay?.firstTeamName);
//       setSecondTeamName(gamePlay?.secondTeamName);
//     }}
//   >
//     Edit Score
//   </Button>
// </Group>
