import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectTeamById } from "../teams/teamSlice";
import { addNewPlayer, addNewPlayerToPlayer } from "./playerSlice";
import { Box, Select, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

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

  const onSavePlayerClicked = (value) => {

    const playerFirstName = value.playerFirstName;
    const playerLastName = value.playerLastName;
    const playerAddress = value.playerAddress;
    const position = value.position;
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
  };
  const [data, setData] = useState(["Kaleci", "Defans", "Orta Saha", "Forvet"]);
  const form = useForm({
    initialValues: {
      playerFirstName: "",
      playerLastName: "",
      playerAddress: "",
      position: "",
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
            <Button type="submit">Add Player</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
