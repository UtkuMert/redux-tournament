import { Link } from "react-router-dom";
import { Table, Button, Group } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ConfirmPlayers } from "../playersList/playerListSlice";
import { MdCancel } from "react-icons/md";
import { deletePlayer } from "./playerSlice";
import toast, { Toaster } from "react-hot-toast";
export const PlayerExcerpt = ({ players }) => {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onSavePlayerClicked = (playerId) => {
    try {
      setAddRequestStatus("pending");
      dispatch(ConfirmPlayers({ playerId })).unwrap();
      toast("Oyuncu Onaylandı.");
    } catch (error) {
      console.error("Failed to save the player to list", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };
  const onDeletePlayerClicked = (id) => {
    try {
      dispatch(deletePlayer({ id })).unwrap();
      toast("Oyuncu Silindi.");
    } catch (err) {
      console.error("Failed to delete the player", err);
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
            <th>Player Address</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.playerFirstName + " " + player.playerLastName}</td>
              <td>{player.teamId}</td>
              <td>{player.playerAddress}</td>
              <td>{player.position}</td>
              <td>
                {" "}
                <Link to={`player/edit/${player.id}`}>
                  <button
                    className="btn btn-sm btn-outline btn-warning"
                    type="submit"
                  >
                    Edit Player
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-success"
                  onClick={() => {
                    onSavePlayerClicked(player?.id);
                  }}
                >
                  Confirm The Player
                </button>
              </td>
              <td>
                <Group position="center">
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      console.log(player?.id);
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
