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

  useEffect(() => {
    if (stagesStatus === "idle") {
      dispatch(fetchStages());
      console.log("Stages", stages);
    }
  }, [stagesStatus, dispatch]);

  return (
    <div>
      {stages?.map((stage) => (
        <p key={stage?.id}>{stage?.stageName}</p>
      ))}
    </div>
  );
};
