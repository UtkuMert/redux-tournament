import { useState } from "react";
import { Table, Modal, Group } from "@mantine/core";

import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import EditConfirmedPlayerForm from "./EditConfirmedPlayerForm";
import { deleteConfirmedPlayer } from "./playerListSlice";
import toast, { Toaster } from "react-hot-toast";
export const ConfirmPlayerExcerpt = ({ players }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [playerId, setPlayerId] = useState("");

  const onDeletePlayerClicked = (playerId) => {
    try {
      dispatch(deleteConfirmedPlayer({ playerId })).unwrap();
      toast("Oyuncu Silindi.");
    } catch (err) {
      console.error("Failed to delete the tournament", err);
    }
  };
  return (
    <>
      <Toaster />
      <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
        <thead>
          <tr>
            <th>Player Id</th>
            <th>Player Name</th>
            <th>Team id</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player) => (
            <tr key={player?.id}>
              <td>{player?.id}</td>
              <td>{player?.playerFirstName + " " + player?.playerLastName}</td>
              <td>{player?.teamId}</td>
              <td>{player?.position}</td>
              <td>
                <Modal
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="Introduce yourself!"
                >
                  <EditConfirmedPlayerForm playerId={playerId} />
                </Modal>
                <Group position="center">
                  <button
                    className="btn btn-sm btn-outline btn-accent"
                    onClick={() => {
                      setOpened(true);
                      setPlayerId(player?.id);
                    }}
                  >
                    Edit Player
                  </button>
                </Group>
              </td>
              <td>
                <Group position="center">
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      onDeletePlayerClicked(player?.id);
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
    </>
  );
};
