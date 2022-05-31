import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTeam, selectTeamById, updateTeam } from "./teamSlice";
import { selectTournamentById } from "../tournaments/tournamentSlice";
import { Box, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export const EditTeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const team = useSelector((state) => selectTeamById(state, Number(id)));

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
      dispatch(updateTeam({ teamName, id })).unwrap();

      setTeamName("");
      navigate("/");
    } catch (error) {
      console.error("Failed to save the team", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const onDeleteTeamClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deleteTeam({ id })).unwrap();

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
            <Button type="submit">Update Team</Button>
            <Button onClick={onDeleteTeamClicked}>Delete Team</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

// <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
// <h2>Edit Team</h2>
// <form>
//   <div className="mb-6">
//     <label
//       htmlFor="teamName"
//       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//     >
//       Team Name
//     </label>
//     <input
//       type="text"
//       id="teamName"
//       name="teamName"
//       value={teamName}
//       onChange={onTeamNameChanged}
//       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       placeholder="Enter A Team Name"
//       required=""
//     />
//   </div>
//   <div className="mb-6">
//     <label htmlFor="tournament">Tournament:</label>
//     <input readOnly value={tournamentName} />
//   </div>

//   <button
//     type="button"
//     onClick={onSaveTeamClicked}
//     disabled={!canSave}
//     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//   >
//     Update Team
//   </button>

//   <button
//     type="button"
//     onClick={onDeleteTeamClicked}
//     className=" btn-warning text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//   >
//     Delete Tournament
//   </button>
// </form>
// </div>
