import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextInput, Button, Modal, Select, Group } from "@mantine/core";

import { matchTeams } from "./gamePlaysSlice";
import { useForm } from "@mantine/form";
import {
  selectStageTeamByStageId,
  selectAllStageTeams,
} from "../stageTeams/stageTeamsSlice";


export const AddTeamsMatchForm = ({stageId}) => {
  const dispatch = useDispatch();
  //const { id } = useParams();
  const navigate = useNavigate();

  const [firstStageTeamId, setFirstStageTeamId] = useState("");
  const [secondStageTeamId, setSecondStageTeamId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [date, setDate] = useState("Yarin");

  const stagesTeams = useSelector((state) => selectStageTeamByStageId(state, Number(stageId)));


  const onMatchTeamsClicked = (value) => {
    const firstStageTeamId = value.firstStageTeamId;
    const secondStageTeamId = value.secondStageTeamId;
    try {
      setAddRequestStatus("pending");
      dispatch(
        matchTeams({ firstStageTeamId, secondStageTeamId, date })
      ).unwrap();

      setFirstStageTeamId("");
      setSecondStageTeamId("");
      navigate("/");
    } catch (error) {
      console.error("Failed to match the team", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };
  const data = [];
  stagesTeams?.map((stagesTeam) =>
    data.push({
      value: stagesTeam.teamId,
      label: stagesTeam.teamName,
    })
  );

  const form = useForm({
    initialValues: {
      firstStageTeamId: 0,
      secondStageTeamId: 0,
    },
  });
  return (
    <div>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit((value) => onMatchTeamsClicked(value))}>
          <Select
            label="First Team"
            data={data}
            placeholder="Select First Team"
            searchable
            required=""
            {...form.getInputProps("firstStageTeamId")}
          />
          <Select
            label="Second Team"
            data={data}
            placeholder="Select Second Team"
            searchable
            required=""
            {...form.getInputProps("secondStageTeamId")}
          />
          <Group position="right" mt="md">
            <button className="btn btn-sm btn-wide btn-secondary" type="submit">Match Team</button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
