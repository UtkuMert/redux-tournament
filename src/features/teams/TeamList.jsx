import { useSelector, useDispatch} from "react-redux";
import { selectAllTeams, getTeamsError, getTeamsStatus, fetchTeams } from "./teamSlice";
import { useEffect } from "react";
import {TeamExcerpt} from './TeamExcerpt'

export const TeamList = () => {
  const dispatch = useDispatch();
  const teams = useSelector(selectAllTeams);
  const teamsStatus = useSelector(getTeamsStatus);
  const teamsError = useSelector(getTeamsError);

  useEffect(() => {
    if (teamsStatus === "idle") {
      dispatch(fetchTeams());
    }
  }, [teamsStatus, dispatch]);

  let content;
  if (teamsStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (teamsStatus === "succeeded") {
    content  = (
      <TeamExcerpt teams={teams} />
    );
  } else if (teamsStatus === "failed") {
    content = <p>{teamsError}</p>;
  }
  return (
    <section>
      <h2 className="flex justify-items-center">Teams</h2>
      <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
        {content}
      </div>
    </section>
  );
};


