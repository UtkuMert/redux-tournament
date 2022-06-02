import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPlayersList,
  getPlayersListStatus,
  getPlayersListError,
  fetchPlayersList,
} from "./playerListSlice";
import { useEffect } from "react";
import {ConfirmPlayerExcerpt} from "./ConfirmPlayerExcerpt";

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
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2">
    <p className="text-2xl font-sans font-medium pb-4">Players</p>
    <div className="p-10 flex flex-wrap items-center">
      {content}
    </div>
  </div>
  );
};


