import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNewTournament } from "./tournamentSlice";
import { Box, TextInput, Button, Group } from "@mantine/core";
export const AddTournamentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tournamentName, setTournamentName] = useState("");
  const [description, setDescription] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTournamentNameChanged = (e) => setTournamentName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave =
    [tournamentName, description].every(Boolean) && addRequestStatus === "idle";

  const onSaveTournamentClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(addNewTournament({ tournamentName, description })).unwrap();

        setTournamentName("");
        setDescription("");
        navigate("/");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div>
      <h2>Add Tournament</h2>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form>
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
        </form>
      </Box>
    </div>
  );
};
