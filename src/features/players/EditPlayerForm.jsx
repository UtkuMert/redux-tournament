import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { deletePlayer, selectPlayerById } from "./playerSlice";
import { selectTeamById } from "../teams/teamSlice";
import { updateNewPlayer } from "./playerSlice";

import { Box, TextInput, Button, Group } from "@mantine/core";

export const EditPlayerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const player = useSelector((state) => selectPlayerById(state, Number(id)));

  const [playerFirstName, setPlayerFirstName] = useState(
    player?.playerFirstName
  );
  const [playerLastName, setPlayerLastName] = useState(player?.playerLastName);
  const [playerAddress, setPlayerAddress] = useState(player?.playerAddress);
  const [position, setPosition] = useState(player?.position);

  const team = useSelector((state) =>
    selectTeamById(state, Number(player?.teamId))
  );
  const [teamName, setTeamName] = useState(team?.teamName);

  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!player) {
    return (
      <section>
        <h2>player not found!</h2>
      </section>
    );
  }

  const onFirstNameChange = (e) => setPlayerFirstName(e.target.value);
  const onLastNameChange = (e) => setPlayerLastName(e.target.value);
  const onplayerAddressChange = (e) => setPlayerAddress(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);

  const canSave =
    [playerFirstName, playerLastName, playerAddress, position].every(Boolean) &&
    requestStatus === "idle";

  const onSavePlayerClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updateNewPlayer({
            playerFirstName,
            playerLastName,
            playerAddress,
            position,
            id,
          })
        ).unwrap();

        setPlayerFirstName("");
        setPlayerLastName("");
        setPlayerAddress("");
        setPosition("");
        navigate("/");
      } catch (error) {
        console.error("Failed to update the player", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePlayerClicked = () => {
    console.log("Girdi")
    try {
      setRequestStatus("pending");
      dispatch(deletePlayer({ id })).unwrap();

      setPlayerFirstName("");
      setPlayerLastName("");
      setPlayerAddress("");
      setPosition("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the player", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form>
          <TextInput
            type="text"
            id="firstName"
            label="First Name"
            placeholder="First Name"
            value={playerFirstName}
            onChange={onFirstNameChange}
          />
          <TextInput
            type="text"
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            value={playerLastName}
            onChange={onLastNameChange}
          />
          <TextInput
            type="text"
            id="address"
            label="Adress"
            placeholder="Address"
            value={playerAddress}
            onChange={onplayerAddressChange}
          />
          <TextInput
            type="text"
            id="position"
            label="Position"
            placeholder="Position"
            value={position}
            onChange={onPositionChange}
          />
          <TextInput
            label="Team"
            placeholder="Team Name"
            readOnly
            value={teamName}
          />

          <Group position="right" mt="md">
            <Button
              onClick={onSavePlayerClicked}
              type="button"
              disabled={!canSave}
              className="btn btn-active"
            >
              Update Player
            </Button>
            <Button
              onClick={onDeletePlayerClicked}
              type="button"
              disabled={!canSave}
              className="btn btn-active"
            >
              Delete Player
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
