import React from "react";
import { TournamentList } from "../features/tournaments/TournamentList";
import { TeamList } from "../features/teams/TeamList";
import { PlayerList } from "../features/players/PlayerList";
import { ConfirmedPlayerList } from "../features/playersList/ConfirmedPlayerList";
export const Home = () => {
  return (
    <>
      <TournamentList />
      <TeamList />
      <PlayerList />
      <ConfirmedPlayerList />
    </>
  );
};
