import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGamePerformances,
  getGamePerformancesError,
  getGamePerformancesStatus,
  selectGamePerformanceByStageId,
} from "../../admin/gamePerformances/gamePerformances";
import { HomeGamePlayedExcerpt } from "./HomeGamePlayedExcerpt";

export const HomeGamePlayedList = ({ stageId }) => {
  const dispatch = useDispatch();
  const gamePerformances = useSelector((state) =>
    selectGamePerformanceByStageId(state, Number(stageId))
  );
  const gamePerformancesStatus = useSelector(getGamePerformancesStatus);
  const error = useSelector(getGamePerformancesError);

  useEffect(() => {
    if (gamePerformancesStatus === "idle") {
      dispatch(fetchGamePerformances());
    }
  }, [gamePerformancesStatus, dispatch]);

  let content;
  if (gamePerformancesStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (gamePerformancesStatus === "succeeded") {
    content = <HomeGamePlayedExcerpt gamePerformances={gamePerformances} />;
  } else if (gamePerformancesStatus === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2 w-full">
      <p className="text-2xl font-sans font-medium pb-4">Results</p>
      <div className="p-10 flex flex-wrap items-center w-full">{content}</div>
    </div>
  );
};
