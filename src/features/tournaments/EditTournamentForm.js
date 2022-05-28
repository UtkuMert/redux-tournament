import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTournamentById,
  updateTournament,
  deleteTournament,
} from "./tournamentSlice";
import { useParams, useNavigate } from "react-router-dom";

import { Box, TextInput, Button, Group } from "@mantine/core";

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
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!tournament) {
    return (
      <section>
        <h2>tournament not found!</h2>
      </section>
    );
  }

  const onTournamentNameChanged = (e) => setTournamentName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave =
    [tournamentName, description].every(Boolean) && requestStatus === "idle";

  const onSaveTournamentClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updateTournament({ id, tournamentName, description })
        ).unwrap();

        setTournamentName("");
        setDescription("");
        navigate(`/tournament/${id}`);
      } catch (error) {
        console.error("Failed to save the tournament", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeleteTournamentClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deleteTournament({ id })).unwrap();

      setTournamentName("");
      setDescription("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the tournament", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <div>
      <h2>Edit Tournament</h2>
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
             Save Tournament
            </Button>
            <Button
              onClick={onDeleteTournamentClicked}
              type="button"
              disabled={!canSave}
              color="teal"
              className="btn btn-active"
            >
             Delete Tournament
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
