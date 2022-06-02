import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import {
  fetchTournaments,
  getTournamentsError,
  getTournamentsStatus,
  selectAllTournaments,
} from "../../admin/tournaments/tournamentSlice";
import {HomeTournamentExcerpt} from "./HomeTournamentExcerpt";

export const HomeTournamentList = () => {
  const dispatch = useDispatch();
  const tournaments = useSelector(selectAllTournaments);
  const tournamentsStatus = useSelector(getTournamentsStatus);
  const error = useSelector(getTournamentsError);
 
  useEffect(() => {
    if (tournamentsStatus === "idle") {
      dispatch(fetchTournaments());
    }
  }, [tournamentsStatus, dispatch]);

  let content;
  if (tournamentsStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (tournamentsStatus === "succeeded") {
    content = <HomeTournamentExcerpt tournaments={tournaments} />;
  } else if (tournamentsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2 max-w-6xl">
      <p className="text-2xl font-sans font-medium pb-4">Tournaments</p>
      <div className="p-10 flex flex-wrap items-center">{content}</div>
    </div>
  );
};

