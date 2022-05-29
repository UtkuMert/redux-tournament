import { useSelector, useDispatch } from "react-redux";
import {
  selectAllStages,
  getStagesError,
  getStagesStatus,
  fetchStages,
} from "./stageSlice";
import { useEffect } from "react";
import { StageExcerpt } from "./StageExcerpt";
import { useParams } from "react-router-dom";

export const StageList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const stages = useSelector(selectAllStages);
  const stagesStatus = useSelector(getStagesStatus);
  const error = useSelector(getStagesError);
  console.log(stagesStatus);
  console.log(error);

  useEffect(() => {
    dispatch(fetchStages(id));
  }, []);

  let content;
  if (stagesStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (stagesStatus === "succeeded") {
    content = <StageExcerpt stages={stages} />;
  } else if (stagesStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Stages</h2>
      <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
        {content}
      </div>
    </section>
  );
};
