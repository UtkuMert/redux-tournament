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
    if (stagesStatus === "idle") {
      dispatch(fetchStages());
    }
  }, [fetchStages, dispatch]);

  return (
    <div>
      {stages?.map((stage) => (
        <p>{stages?.stageName}</p>
      ))}
    </div>
  );
};
