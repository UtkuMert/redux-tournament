import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextInput, Button, Group } from "@mantine/core";

import { addNewTeam } from "./teamSlice";
import {
  selectAllTournaments,
  selectTournamentById,
} from "../tournaments/tournamentSlice";

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

  const onNameChange = (e) => setTeamName(e.target.value);

  const canSave = [teamName].every(Boolean) && addRequestStatus === "idle";

  const onSaveTeamClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewTeam({ teamName, id })).unwrap();

        setTeamName("");
        navigate("/");
      } catch (error) {
        console.error("Failed to save the team", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div>
      <h2>Add Team</h2>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form>
          <TextInput
            type="text"
            id="teamName"
            label="Team Name"
            placeholder="Team Name"
            value={teamName}
            onChange={onNameChange}
            required=""
          />
          <TextInput
            label="Team"
            placeholder="Team Name"
            readOnly
            value={tournamentName}
          />
          <Group position="right" mt="md">
            <Button
              onClick={onSaveTeamClicked}
              type="button"
              disabled={!canSave}
              color="teal"
              className="btn btn-active"
            >
              Add Team
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

{
  /* <section>
      <h2>Add a New Team</h2>
      <form className="flex flex-direction">
        <label htmlFor="teamName">Team Name:</label>
        <input
          type="text"
          id="teamName"
          name="teamName"
          value={teamName}
          onChange={onNameChange}
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="tournament">Tournament:</label>
        <input readOnly value={tournamentName} />

        <button
          type="button"
          onClick={onSaveTournamentClicked}
          className="btn btn-active"
          disabled={!canSave}
        >
          Save Team
        </button>
      </form>
    </section> */
}
