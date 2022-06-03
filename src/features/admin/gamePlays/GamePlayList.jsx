import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getGamePlaysError,
  getGamePlaysStatus,
  selectGamePlaysByStageId,
  fetchGameToPlay,
} from "./gamePlaysSlice";
import { GamePlayExcerpt } from "./GamePlayExcerpt";
import { useParams } from "react-router-dom";


export const GamePlayList = () => {
  const dispatch = useDispatch();
  const { stageId } = useParams();
  const gamePlayStatus = useSelector(getGamePlaysStatus);
  const error = useSelector(getGamePlaysError);

  const gamePlays = useSelector((state) =>
    selectGamePlaysByStageId(state, Number(stageId))
  );

  useEffect(() => {
    if (gamePlayStatus === "idle") {
      dispatch(fetchGameToPlay());
    }
  }, [gamePlayStatus, dispatch]);

  let content;
  if (gamePlayStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (gamePlayStatus === "succeeded") {
    content = <GamePlayExcerpt gamePlays={gamePlays} />;
  } else if (gamePlayStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2">
      <p className="text-2xl font-sans font-medium pb-4">Next Game</p>
      <div className="p-10 flex flex-wrap items-center">{content}</div>
    </div>
  );
};
