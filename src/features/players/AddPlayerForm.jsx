import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectTeamById } from "../teams/teamSlice";
import { addNewPlayer, addNewPlayerToPlayer } from "./playerSlice";
import { Box, TextInput, Button, Group } from "@mantine/core";

export const AddPlayerForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const team = useSelector((state) => selectTeamById(state, Number(id)));
  
  const [teamName, setTeamName] = useState(team?.teamName);

  const [playerFirstName, setPlayerFirstName] = useState("");
  const [playerLastName, setPlayerLastName] = useState("");
  const [playerAddress, setPlayerAddress] = useState("");
  const [position, setPosition] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onFirstNameChange = (e) => setPlayerFirstName(e.target.value);
  const onLastNameChange = (e) => setPlayerLastName(e.target.value);
  const onplayerAddressChange = (e) => setPlayerAddress(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);

  const canSave =
    [playerFirstName, playerLastName, playerAddress, position].every(Boolean) &&
    addRequestStatus === "idle";

  const onSavePlayerClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewPlayer({
            playerFirstName,
            playerLastName,
            playerAddress,
            position,
            id,
          })
        ).unwrap();
        dispatch(
          addNewPlayerToPlayer({
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
        console.error("Failed to save the player", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  //   const form = useForm<{ firstName: playerFirstName, lastName: playerLastName, address: playerAddress, position: position }>({
  //     initialValues: { name: '', age: undefined },
  //     validate: (values) => ({
  //         firstName: values.firstName.length < 2 ? 'Too short firstname' : null,
  //         lastName: values.lastName.length < 2 ? 'Too short lastname' : null,
  //         playerAddress: values.playerAddress.length < 2 ? 'Too short adress' : null,
  //         position: values.position.length < 2 ? 'Too short position' : null,

  //     }),
  //   });
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
              color="teal"
              className="btn btn-active"
            >
              Add Player
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
