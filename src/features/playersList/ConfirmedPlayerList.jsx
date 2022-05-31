import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPlayersList,
  getPlayersListStatus,
  getPlayersListError,
  fetchPlayersList,
} from "./playerListSlice";
import { useEffect } from "react";
import ConfirmPlayerExcerpt from "./ConfirmPlayerExcerpt";

export const ConfirmedPlayerList = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectAllPlayersList);
  const playersStatus = useSelector(getPlayersListStatus);
  const playersError = useSelector(getPlayersListError);

  
  useEffect(() => {
    if (playersStatus === "idle") {
      dispatch(fetchPlayersList());
    }
  }, [playersStatus, dispatch]);

  let content;
  if (playersStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (playersStatus === "succeeded") {
    content = <ConfirmPlayerExcerpt players={players} />;
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


