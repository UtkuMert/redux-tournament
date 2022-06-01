import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { deletePlayer, selectPlayerById } from "./playerSlice";
import { selectTeamById } from "../teams/teamSlice";
import { updateNewPlayer } from "./playerSlice";

import { Box, TextInput, Select, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
export const EditPlayerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onSavePlayerClicked = (value) => {
    try {
      setRequestStatus("pending");
      const playerFirstName = value.playerFirstName;
      const playerLastName = value.playerLastName;
      const playerAddress = value.playerAddress;
      const position = value.position;
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
  };

  const onDeletePlayerClicked = () => {
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
  const [data, setData] = useState(["Kaleci", "Defans", "Orta Saha", "Forvet"]);
  const form = useForm({
    initialValues: {
      playerFirstName: playerFirstName,
      playerLastName: playerLastName,
      playerAddress: playerAddress,
      position: position,
    },

    validate: {
      playerFirstName: (value) =>
        value.length > 2 ? null : "Player First Name must be least 3 character",
      playerLastName: (value) =>
        value.length > 1 ? null : "Player Last Name must be least 2 character",
      playerAddress: (value) =>
        value.length > 1 ? null : "Player Address must be least 2 character",
      position: (value) => (value.length > 1 ? null : "Select Position"),
    },
  });

  if (!player) {
    return (
      <section>
        <h2>player not found!</h2>
      </section>
    );
  }

  return (
    <div>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit((value) => onSavePlayerClicked(value))}>
          <TextInput
            required
            type="text"
            id="firstName"
            label="First Name"
            placeholder="First Name"
            {...form.getInputProps("playerFirstName")}
          />
          <TextInput
            required
            type="text"
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            {...form.getInputProps("playerLastName")}
          />
          <TextInput
            required
            type="text"
            id="address"
            label="Adress"
            placeholder="Address"
            {...form.getInputProps("playerAddress")}
          />
          <Select
            label="Position"
            data={data}
            placeholder="Select Position"
            nothingFound="Nothing found"
            searchable
            required=""
            {...form.getInputProps("position")}
          />
          <TextInput
            label="Team"
            placeholder="Team Name"
            readOnly
            value={teamName}
          />

          <Group position="right" mt="md">
            <button
              className="btn btn-sm btn-outline btn-warning"
              type="submit"
            >
              Update Player
            </button>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={onDeletePlayerClicked}
              type="button"
            >
              Delete Player
            </button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
