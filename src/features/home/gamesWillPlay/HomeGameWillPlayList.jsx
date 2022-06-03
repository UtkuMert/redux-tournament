import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchGameToPlay,
  getGamePlaysError,
  getGamePlaysStatus,
  selectGamePlaysByStageId,
} from "../../admin/gamePlays/gamePlaysSlice";
import { HomeGameWillPlayExcerpt } from "./HomeGameWillPlayExcerpt";


export const HomeGameWillPlayList = () => {
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
    content = <HomeGameWillPlayExcerpt gamePlays={gamePlays} />;
  } else if (gamePlayStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2 w-full border border-red-400">
      <p className="text-2xl font-sans font-medium pb-4">Next Games</p>
      <div className="p-10 flex flex-wrap items-center w-full border border-red-400">{content}</div>
    </div>
  );
};

