import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { addTeamToStage } from "./stageTeamsSlice";

import { selectTeamByTournamentId } from "../teams/teamSlice";
import { selectStageById } from "../stages/stageSlice";
import { Box, MultiSelect, TextInput, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export const AddStageTeamsForm = ({ stageId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [teamId, setTeamId] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const stage = useSelector((state) => selectStageById(state, Number(stageId)));

  const [stageName, setStageName] = useState(stage?.stageName);
  const [tournamentId, setTournamentId] = useState(stage?.tournamentId);

  const teams = useSelector((state) =>
    selectTeamByTournamentId(state, Number(tournamentId))
  );

  const onTeamChange = (e) => setTeamId(e.target.value);

  const onSaveTeamToStageClicked = (values) => {
    try {
      setAddRequestStatus("pending");
      console.log(values);
      values?.teams?.map((value) =>
        dispatch(addTeamToStage({ value, stageId })).unwrap()
      );

      setTeamId("");

      navigate(`/tournament/${tournamentId}/stage`);
    } catch (error) {
      console.error("Failed to save the team", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const data = [];
  teams?.map((team) => data.push({ value: team?.id, label: team?.teamName }));

  const form = useForm({
    initialValues: {
      teams: "",
    },

    validate: {
      teams: (value) => (value.length > 0 ? null : "You have to select teams"),
    },
  });

  return (
    <div>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => onSaveTeamToStageClicked(values))}
        >
          <MultiSelect
            key={teams?.map((team) => team.teamId)}
            mt="md"
            data={data}
            label="Teams"
            {...form.getInputProps("teams")}
          />
          <TextInput readOnly label="Stage" value={stageName} />

          <Group position="right" mt="md">
            <button className="btn btn-sm btn-wide btn-secondary" type="submit">
              Add Teams To Stage
            </button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
