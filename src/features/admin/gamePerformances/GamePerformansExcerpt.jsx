import { useState } from "react";
import { Table, Modal, Group } from "@mantine/core";
import { AddScorePlayerForm } from "../scorePlayers/AddScorePlayerForm";
import { EditGamePerformanceForm } from "./EditGamePerformanceForm";

export const GamePerformansExcerpt = ({ gamePerformances }) => {
  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [firstTeamId, setFirstTeamId] = useState("");
  const [firstTeamName, setFirstTeamName] = useState("");
  const [secondTeamId, setSecondTeamId] = useState("");
  const [secondTeamName, setSecondTeamName] = useState("");
  const [gamePerformanceId, setGamePerformanceId] = useState("");
  const [gameToPlayId, setGameToPlayId] = useState("");
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
                title="Score-Player"
              >
                <AddScorePlayerForm
                  firstTeamId={firstTeamId}
                  secondTeamId={secondTeamId}
                  gamePerformanceId={gamePerformanceId}
                />
              </Modal>

              <Modal
                opened={openedEdit}
                onClose={() => setOpenedEdit(false)}
                title="Edit Score"
              >
                <EditGamePerformanceForm
                  firstTeamId={firstTeamId}
                  secondTeamId={secondTeamId}
                  gameToPlayId={gameToPlayId}
                  firstTeamName={firstTeamName}
                  secondTeamName={secondTeamName}
                />
              </Modal>
              <Group position="center">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => {
                    setOpened(true);
                    setFirstTeamId(gamePerformance?.firstTeamId);
                    setSecondTeamId(gamePerformance?.secondTeamId);
                    setGamePerformanceId(gamePerformance?.id);
                  }}
                >
                  Add Player For Score
                </button>
                <button
                  className="btn btn-sm btn-outline btn-warning"
                  onClick={() => {
                    setOpened(true);
                    setFirstTeamId(gamePerformance?.firstTeamId);
                    setSecondTeamId(gamePerformance?.secondTeamId);
                    setGamePerformanceId(gamePerformance?.id);
                  }}
                >
                 Edit Player For Score
                </button>
                <button
                  className="btn btn-sm btn-outline btn-warning"
                  onClick={() => {
                    setOpenedEdit(true);
                    setFirstTeamId(gamePerformance?.firstTeamId);
                    setSecondTeamId(gamePerformance?.secondTeamId);
                    setGameToPlayId(gamePerformance?.gameToPlayId);
                    setFirstTeamName(gamePerformance?.firstTeamName);
                    setSecondTeamName(gamePerformance?.secondTeamName);
                  }}
                >
                  Edit Score
                </button>
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
