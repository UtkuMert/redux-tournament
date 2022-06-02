import React from "react";

import { TeamList } from "../features/admin/teams/TeamList";
import { PlayerList } from "../features/admin/players/PlayerList";
import { ConfirmedPlayerList } from "../features/admin/playersList/ConfirmedPlayerList";
import { TournamentList } from "../features/admin/tournaments/TournamentList";
export const Admin = () => {
  return (
    <>
    <TournamentList />
    <TeamList />
    <PlayerList />
    <ConfirmedPlayerList />
  </>
  )
}
