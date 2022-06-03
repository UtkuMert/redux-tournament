import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectGamePerformanceByStageId,
  getGamePerformancesStatus,
  getGamePerformancesError,
  fetchGamePerformances,
} from "./gamePerformances";
import { GamePerformansExcerpt } from "./GamePerformansExcerpt";

export const GamePerformancesList = ({stageId}) => {
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
    content = <GamePerformansExcerpt gamePerformances={gamePerformances} />;
  } else if (gamePerformancesStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2">
    <p className="text-2xl font-sans font-medium pb-4">Oynanmıs Maclar</p>
    <div className="p-10 flex flex-wrap items-center">
      {content}
    </div>
  </div>
  );
};
