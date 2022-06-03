import React from "react";

import { TeamList } from "../features/admin/teams/TeamList";
import { PlayerList } from "../features/admin/players/PlayerList";
import { ConfirmedPlayerList } from "../features/admin/playersList/ConfirmedPlayerList";
import { TournamentList } from "../features/admin/tournaments/TournamentList";
import { Accordion } from "@mantine/core";
export const Admin = () => {
  return (
    <div className="mx-auto">
      <TournamentList />
      <Accordion>
        <Accordion.Item label="Teams">
          <TeamList />
        </Accordion.Item>

        <Accordion.Item label="Players">
          <PlayerList />
        </Accordion.Item>

        <Accordion.Item label="Confirmed Players">
          <ConfirmedPlayerList />
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
