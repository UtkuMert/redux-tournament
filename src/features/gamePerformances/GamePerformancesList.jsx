import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectGamePerformanceByStageIdId,
  getGamePerformancesStatus,
  getGamePerformancesError,
  fetchGamePerformances,
} from "./gamePerformances";
import { GamePerformansExcerpt } from "./GamePerformansExcerpt";

export const GamePerformancesList = ({stageId}) => {
  const dispatch = useDispatch();
 
  const gamePerformances = useSelector((state) =>
  selectGamePerformanceByStageIdId(state, Number(stageId))
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
    <section>
      <h2>Oynanmis Maclar</h2>
      <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
        {content}
      </div>
    </section>
  );
};
