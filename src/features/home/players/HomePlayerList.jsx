import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlayers,
  getPlayersError,
  getPlayersStatus,
  selectAllPlayers,
} from "../../admin/players/playerSlice";
import { HomePlayerExcerpt } from "./HomePlayerExcerpt";

export const HomePlayerList = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectAllPlayers);
  const playersStatus = useSelector(getPlayersStatus);
  const playersError = useSelector(getPlayersError);

  useEffect(() => {
    if (playersStatus === "idle") {
      dispatch(fetchPlayers());
    }
  }, [playersStatus, dispatch]);

  let content;
  if (playersStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (playersStatus === "succeeded") {
    content = <HomePlayerExcerpt players={players} />;
  } else if (playersStatus === "failed") {
    content = <p>{playersError}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2 ">
      <p className="text-2xl font-sans font-medium pb-4">Player To Add</p>
      <div className="p-10 flex flex-wrap items-center">{content}</div>
    </div>
  );
};
