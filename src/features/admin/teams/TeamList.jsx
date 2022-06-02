import { useSelector, useDispatch } from "react-redux";
import {
  selectAllTeams,
  getTeamsError,
  getTeamsStatus,
  fetchTeams,
} from "./teamSlice";
import { useEffect } from "react";
import { TeamExcerpt } from "./TeamExcerpt";

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
    content = <TeamExcerpt teams={teams} />;
  } else if (teamsStatus === "failed") {
    content = <p>{teamsError}</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2">
      <p className="text-2xl font-sans font-medium pb-4">Teams</p>
      <div className="p-10 flex flex-wrap items-center">{content}</div>
    </div>
  );
};
