import { useState } from "react";
import { Table, Modal, Button, Group } from "@mantine/core";
import { AddGamePerformanceForm } from "../gamePerformances/AddGamePerformanceForm";
import { EditGamePerformanceForm } from "../gamePerformances/EditGamePerformanceForm";

export const GamePlayExcerpt = ({ gamePlays }) => {
  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
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
                title="Add Score"
              >
                <AddGamePerformanceForm
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
                    setGameToPlayId(gamePlay?.id);
                    setFirstTeamName(gamePlay?.firstTeamName);
                    setSecondTeamName(gamePlay?.secondTeamName);
                  }}
                >
                  Add Score
                </button>
                <Modal
                opened={openedEdit}
                onClose={() => setOpenedEdit(false)}
                title="Edit Score"
              >
                <EditGamePerformanceForm
                  gameToPlayId={gameToPlayId}
                />
              </Modal>
                <button
                  className="btn btn-sm btn-outline btn-warning"
                  onClick={() => {
                    setOpenedEdit(true);
                    setGameToPlayId(gamePlay?.id);
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
