import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchStageTeams, getStageTeamsError, selectAllStageTeams } from "./stageTeamSlice";

const StageTeamList = () => {
  const dispatch = useDispatch();

  const stageTeams = useSelector(selectAllStageTeams);
  const stageTeamsStatus = useSelector(getStageTeamsError);
  const error = useSelector(getStageTeamsError);
  console.log("Stages", stageTeams);
  useEffect(() => {
    console.log("Girdi");
    if (stageTeamsStatus === "idle") {
      dispatch(fetchStageTeams());
      console.log("Stages", stageTeams);
    }
  }, [fetchStageTeams, dispatch]);

  return (
    <div>
      {" "}
      {stageTeams?.map((stageTeam) => (
        <p key={stageTeam?.id}>{stageTeam?.stageId}</p>
      ))}
      <p>saggdf</p>
    </div>
  );
};

export default StageTeamList;
