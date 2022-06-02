import React from "react";
import { TournamentList } from "../features/admin/tournaments/TournamentList";
import { TeamList } from "../features/admin/teams/TeamList";
import { PlayerList } from "../features/admin/players/PlayerList";
import { ConfirmedPlayerList } from "../features/admin/playersList/ConfirmedPlayerList";
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
