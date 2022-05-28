import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { matchTeams } from "./gamePlaySlice";

import {fetchStageTeams, selectAllStageTeams} from "../stageTeam/stageTeamSlice"

export const AddTeamsMatchForm = () => {

    const dispatch = useDispatch();
    //const { id } = useParams();
    const navigate = useNavigate();

    const stages = useSelector(selectAllStageTeams)
    console.log(stages);

    console.log(dispatch(fetchStageTeams()));

    dispatch(fetchStageTeams());









  return (
    <div>
         {stages?.map((stage) => (
          <p key={stage?.id}>{stage.teamId}</p>
        ))}
    </div>
  )
}

