import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchStages,
  getStagesError,
  getStagesStatus,
  selectAllStages,
} from "../../admin/stages/stageSlice";
import { HomeStageExcerpt } from "./HomeStageExcerpt";

export const HomeStageList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const stages = useSelector(selectAllStages);
  const stagesStatus = useSelector(getStagesStatus);
  const error = useSelector(getStagesError);
  useEffect(() => {
    dispatch(fetchStages(id));
  }, []);

  let content;
  if (stagesStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (stagesStatus === "succeeded") {
    content = <HomeStageExcerpt stages={stages} />;
  } else if (stagesStatus === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2">
      <p className="text-2xl font-sans font-medium pb-4">Stages</p>
      <div className="p-10 flex flex-wrap items-center">{content}</div>
    </div>
  );
};
