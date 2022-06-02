import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewTournament } from "./tournamentSlice";
import { Box, TextInput,Textarea, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export const AddTournamentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tournamentName, setTournamentName] = useState("");
  const [description, setDescription] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onSaveTournamentClicked = (values) => {
    try {
      setAddRequestStatus("pending");

      const tournamentName = values.tournamentName;
      const description = values.description;

      dispatch(addNewTournament({ tournamentName, description })).unwrap();

      setTournamentName("");
      setDescription("");
      navigate("/")
    } catch (error) {
      console.error("Failed to save the tournament", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };
  const form = useForm({
    initialValues: {
      tournamentName: "",
      description: "",
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
          <Group position="center" mt="md">
            <button className="btn btn-sm btn-wide btn-secondary" type="submit">Add Tournament</button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

{
  /* <form>
<TextInput
  type="text"
  id="tournamentName"
  label="Tournament Name"
  placeholder="Tournament Name"
  value={tournamentName}
  onChange={onTournamentNameChanged}
  required=""
/>
<TextInput
  type="text"
  id="description"
  label="Description"
  placeholder="Description"
  value={description}
  onChange={onDescriptionChanged}
/>
<Group position="right" mt="md">
  <Button
    onClick={onSaveTournamentClicked}
    type="button"
    disabled={!canSave}
    color="teal"
    className="btn btn-active"
  >
    Add Tournament
  </Button>
</Group>
</form> */
}
