import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPlayers,
  getPlayersStatus,
  getPlayersError,
  fetchPlayers,
} from "./playerSlice";
import { useEffect } from "react";
import { PlayerExcerpt } from "./PlayerExcerpt";

export const PlayerList = () => {
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
    content = <PlayerExcerpt players={players} />;
  } else if (playersStatus === "failed") {
    content = <p>{playersError}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2">
      <p className="text-2xl font-sans font-medium pb-4">Player To Add</p>
      <div className="p-10 flex flex-wrap items-center">{content}</div>
    </div>
  );
};
