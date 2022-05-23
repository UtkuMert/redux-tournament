import React from "react";
import { TournamentList } from "../features/tournaments/TournamentList";
import { TeamList } from "../features/teams/TeamList";

export const Home = () => {
  return (
    <>
      <TournamentList />
      <TeamList />
    </>
  );
};
