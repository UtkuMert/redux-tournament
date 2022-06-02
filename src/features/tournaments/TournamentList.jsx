import { useSelector, useDispatch } from "react-redux";
import {
  selectAllTournaments,
  getTournamentsStatus,
  getTournamentsError,
  fetchTournaments,
} from "./tournamentSlice";
import { useEffect } from "react";

import { TournamentExcerpt } from "./TournamentExcerpt";

export const TournamentList = () => {
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
    content = <TournamentExcerpt tournaments={tournaments} />;
  } else if (tournamentsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return (
    
      <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2">
        <p className="text-2xl font-sans font-medium pb-4">Tournaments</p>
        <div className="p-10 flex flex-wrap items-center">
          {content}
        </div>
      </div>
  
  );
};
