import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectAllGamePerformances,
  getGamePerformancesStatus,
  getGamePerformancesError,
  fetchGamePerformances,
} from "./gamePerformances";
import { GamePerformansExcerpt } from "./GamePerformansExcerpt";

export const GamePerformancesList = () => {
  const dispatch = useDispatch();

  const gamePerformances = useSelector(selectAllGamePerformances);
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
      <h2>Gecmis Maclar</h2>
      <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
        {content}
      </div>
    </section>
  );
};
