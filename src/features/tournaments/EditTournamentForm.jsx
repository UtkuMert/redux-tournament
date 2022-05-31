import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTournamentById,
  updateTournament,
  deleteTournament,
} from "./tournamentSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

import { Box, TextInput, Textarea, Button, Group } from "@mantine/core";

export const EditTournamentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tournament = useSelector((state) =>
    selectTournamentById(state, Number(id))
  );

  const [tournamentName, setTournamentName] = useState(
    tournament?.tournamentName
  );
  const [description, setDescription] = useState(tournament?.description);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  const onSaveTournamentClicked = (values) => {
    try {
      setAddRequestStatus("pending");

      const tournamentName = values.tournamentName;
      const description = values.description;

      dispatch(updateTournament({ id, tournamentName, description })).unwrap();

      setTournamentName("");
      setDescription("");
    } catch (error) {
      console.error("Failed to save the tournament", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const onDeleteTournamentClicked = () => {
    try {
      setAddRequestStatus("pending");
      dispatch(deleteTournament({ id })).unwrap();

      setTournamentName("");
      setDescription("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the tournament", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const form = useForm({
    initialValues: {
      tournamentName: tournamentName,
      description: description,
    },

    validate: {
      tournamentName: (value) =>
        value.length > 2 ? null : "Tournament Name must be least 3 character",
      description: (value) =>
        value.length > 2 ? null : "Description Name must be least 3 character",
    },
  });

  return (
    <div>
      <h2>Add Tournament</h2>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => onSaveTournamentClicked(values))}
        >
          <TextInput
            required
            type="text"
            id="tournamentName"
            label="Tournament Name"
            placeholder="Tournament Name"
            {...form.getInputProps("tournamentName")}
          />
          <Textarea
            required
            type="text"
            id="description"
            label="Description"
            placeholder="Description"
            {...form.getInputProps("description")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
            <Button onClick={onDeleteTournamentClicked}>Delete</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
