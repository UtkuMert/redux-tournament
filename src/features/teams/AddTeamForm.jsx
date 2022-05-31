import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

import { addNewTeam } from "./teamSlice";
import { selectTournamentById } from "../tournaments/tournamentSlice";

export const AddTeamForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const tournament = useSelector((state) =>
    selectTournamentById(state, Number(id))
  );
  const [tournamentName, setTournamentName] = useState(
    tournament?.tournamentName
  );

  const [teamName, setTeamName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onSaveTeamClicked = (value) => {
    try {
      const teamName = value.teamName;
      setAddRequestStatus("pending");
      dispatch(addNewTeam({ teamName, id })).unwrap();

      setTeamName("");
      navigate("/");
    } catch (error) {
      console.error("Failed to save the team", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };
  const form = useForm({
    initialValues: {
      teamName: "",
    },

    validate: {
      teamName: (value) =>
        value.length > 1 ? null : "Team Name must be least 2 character",
    },
  });
  return (
    <div>
      <h2>Add Team</h2>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit((value) => onSaveTeamClicked(value))}>
          <TextInput
            required
            type="text"
            id="teamName"
            label="Team Name"
            placeholder="Team Name"
            {...form.getInputProps("teamName")}
          />
          <TextInput
            label="Team"
            placeholder="Tournament Name"
            readOnly
            value={tournamentName}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

