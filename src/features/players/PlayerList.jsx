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
    content  = (
      <PlayerExcerpt players={players} />
    );
  } else if (playersStatus === "failed") {
    content = <p>{playersError}</p>;
  }

  return (
    <section>
      <h2 className="flex justify-items-center">Players</h2>
      <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
        {content}
      </div>
    </section>
    
  );
};
