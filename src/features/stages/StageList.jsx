import { useSelector, useDispatch } from "react-redux";
import {
  selectAllStages,
  getStagesError,
  getStagesStatus,
  fetchStages,
} from "./stageSlice";
import { useEffect } from "react";

export const StageList = () => {
  const dispatch = useDispatch();

  const stages = useSelector(selectAllStages);
  const stagesStatus = useSelector(getStagesStatus);
  const error = useSelector(getStagesError);
  console.log(stages);
  useEffect(() => {
    console.log("Girdi")
    if (stagesStatus === "idle") {
      dispatch(fetchStages());
      console.log("Stages",stages);
    }
  }, [fetchStages, dispatch]);

  return (
    <div>
      {stages?.map((stage) => (
        <p key={stage?.id}>{stage?.stageName}</p>
      ))}
    </div>
  );
};
