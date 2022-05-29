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

  const [firstTeamId, setFirstTeamId] = useState("");
  const [secondTeamId, setSecondTeamId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const stagesTeams = useSelector(selectAllStageTeams);
  console.log(stagesTeams)
  const onFirstTeamChange = (e) => setFirstTeamId(e.target.value);
  const onSecondTeamChange = (e) => setSecondTeamId(e.target.value);

  const canSave =
    [firstTeamId, secondTeamId].every(Boolean) && addRequestStatus === "idle";

  const onMatchTeamsClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(matchTeams({ firstTeamId, secondTeamId })).unwrap();

        setFirstTeamId("");
        setSecondTeamId("");
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
      {stagesTeam?.teamName}
    </option>
  ));

  return (
    <div>
      <form action="">
        <label htmlFor="firstTeamName">Team 1</label>
        <select
          id="firstTeamName"
          value={firstTeamId}
          onChange={onFirstTeamChange}
        >
          <option value=""></option>
          {teamsOptions}
        </select>

        <label htmlFor="secondTeamName">Team 2</label>
        <select
          id="secondTeamName"
          value={secondTeamId}
          onChange={onSecondTeamChange}
        >
          <option value=""></option>
          {teamsOptions}
        </select>

        <button
          type="button"
          onClick={onMatchTeamsClicked}
          disabled={!canSave}
        >
          Match Team 
        </button>
      </form>
    </div>
  );
};
