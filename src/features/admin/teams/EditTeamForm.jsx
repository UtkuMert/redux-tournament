import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTeam, selectTeamById, updateTeam } from "./teamSlice";
import { selectTournamentById } from "../tournaments/tournamentSlice";
import { Box, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export const EditTeamForm = ({ teamId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const team = useSelector((state) => selectTeamById(state, Number(teamId)));

  const [teamName, setTeamName] = useState(team?.teamName);
  const tournament = useSelector((state) =>
    selectTournamentById(state, Number(team?.tournamentId))
  );
  const [tournamentName, setTournamentName] = useState(
    tournament?.tournamentName
  );

  const [requestStatus, setRequestStatus] = useState("idle");

  const onSaveTeamClicked = (value) => {
    try {
      const teamName = value.teamName;
      setRequestStatus("pending");
      dispatch(updateTeam({ teamName, teamId })).unwrap();

      setTeamName("");
      navigate(`/admin/team`);
    } catch (error) {
      console.error("Failed to save the team", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const onDeleteTeamClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deleteTeam({ teamId })).unwrap();

      setTeamName("");

      navigate("/");
    } catch (err) {
      console.error("Failed to delete the team", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const form = useForm({
    initialValues: {
      teamName: teamName,
    },

    validate: {
      teamName: (value) =>
        value.length > 1 ? null : "Team Name must be least 2 character",
    },
  });

  if (!team) {
    return (
      <section>
        <h2>team not found!</h2>
      </section>
    );
  }
  return (
    <div>
      <h2>Edit Team</h2>
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
            <button
              className="btn btn-sm btn-outline btn-warning"
              type="submit"
            >
              Update Team
            </button>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={onDeleteTeamClicked}
            >
              Delete Team
            </button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
