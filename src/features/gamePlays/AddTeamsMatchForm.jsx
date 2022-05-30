import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { matchTeams } from "./gamePlaysSlice";

import {
  fetchStageTeams,
  selectAllStageTeams,
} from "../stageTeams/stageTeamsSlice";

export const AddTeamsMatchForm = () => {
  const dispatch = useDispatch();
  //const { id } = useParams();
  const navigate = useNavigate();

  const [firstStageTeamId, setFirstStageTeamId] = useState("");
  const [secondStageTeamId, setSecondStageTeamId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [date, setDate] = useState("Yarin");
  const stagesTeams = useSelector(selectAllStageTeams);
  console.log(stagesTeams);
  const onFirstTeamChange = (e) => setFirstStageTeamId(e.target.value);
  const onSecondTeamChange = (e) => setSecondStageTeamId(e.target.value);

  const canSave =
    [firstStageTeamId, secondStageTeamId].every(Boolean) &&
    addRequestStatus === "idle";
  console.log(firstStageTeamId);
  console.log(secondStageTeamId);
  const onMatchTeamsClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(matchTeams({ firstStageTeamId, secondStageTeamId, date })).unwrap();

        setFirstStageTeamId("");
        setSecondStageTeamId("");
        navigate("/");
      } catch (error) {
        console.error("Failed to match the team", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const teamsOptions = stagesTeams?.map((stagesTeam) => (
    <option key={stagesTeam?.id} value={stagesTeam?.id}>
      {stagesTeam?.id}
    </option>
  ));

  return (
    <div>
      <form action="">
        <label htmlFor="firstTeamName">Team 1</label>
        <select
          id="firstTeamName"
          value={firstStageTeamId}
          onChange={onFirstTeamChange}
        >
          <option value=""></option>
          {teamsOptions}
        </select>

        <label htmlFor="secondTeamName">Team 2</label>
        <select
          id="secondTeamName"
          value={secondStageTeamId}
          onChange={onSecondTeamChange}
        >
          <option value=""></option>
          {teamsOptions}
        </select>

        <button type="button" onClick={onMatchTeamsClicked} disabled={!canSave}>
          Match Team
        </button>
      </form>
    </div>
  );
};
