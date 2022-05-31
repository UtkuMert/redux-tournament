import { Link } from "react-router-dom";
import { Table, Button, Group } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ConfirmPlayers } from "../playersList/playerListSlice";
export const PlayerExcerpt = ({ players }) => {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onSavePlayerClicked = (playerId) => {
    console.log("aloo", playerId)
    try {
      
      setAddRequestStatus("pending");
      dispatch(ConfirmPlayers({ playerId })).unwrap();
    } catch (error) {
      console.error("Failed to save the player to list", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  return (
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
              <Link to={`player/edit/${player.id}`}>Edit Player</Link>
            </td>
            <td>
              <Button
                onClick={() => {
                  onSavePlayerClicked(player?.id);
                }}
              >
                Add Stage
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
