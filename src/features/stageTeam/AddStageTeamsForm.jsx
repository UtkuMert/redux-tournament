import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { addTeamToStage } from "./stageTeamSlice";

import { selectAllTeams } from "../teams/teamSlice";
import { selectAllStages } from "../stages/stageSlice";

export const AddStageTeamsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [teamId, setTeamId] = useState("");
  const [stageId, setStageId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const teams = useSelector(selectAllTeams);
  const stages = useSelector(selectAllStages);

  const onTeamChange = (e) => setTeamId(e.target.value);
  const onStageChange = (e) => setStageId(e.target.value);

  const canSave =
    [teamId, stageId].every(Boolean) && addRequestStatus === "idle";

  const onSaveTeamToStageClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addTeamToStage({ teamId, stageId })).unwrap();

        setTeamId("");
        setStageId("");
        navigate("/");
      } catch (error) {
        console.error("Failed to save the team", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const teamsOptions = teams?.map((team) => (
    <option key={team?.id} value={team?.id}>
      {team?.teamName}
    </option>
  ));

  const stagesOptions = stages?.map((stage) => (
    <option key={stage?.id} value={stage?.id}>
      {stage?.stageName}
    </option>
  ));

  return (
    <div>
      <div>
        {teams?.map((team) => (
          <p key={team?.id}>{team.teamName}</p>
        ))}

        {stages?.map((stage) => (
          <p key={stage?.id}>{stage.stageName}</p>
        ))}
      </div>

      <h3>ADD TEAM TO STAGE</h3>
      <form action="">
        <label htmlFor="teamName">Team</label>
        <select id="teamName" value={teamId} onChange={onTeamChange}>
          <option value=""></option>
          {teamsOptions}
        </select>

        <label htmlFor="stageName">Stage</label>
        <select id="stageName" value={stageId} onChange={onStageChange}>
          <option value=""></option>
          {stagesOptions}
        </select>

        <button
          type="button"
          onClick={onSaveTeamToStageClicked}
          disabled={!canSave}
        >
          Save Team To Stage
        </button>
      </form>
    </div>
  );
};
