import { useSelector } from "react-redux";
import { selectTeamById } from "./teamSlice";
import { useState } from "react";
import { selectPlayersListByTeamId } from "../playersList/playerListSlice";
import { useParams } from "react-router-dom";
import { Table, Modal, Button, Group } from "@mantine/core";
import { ConfirmPlayerExcerpt } from "../playersList/ConfirmPlayerExcerpt";
import { EditTeamForm } from "./EditTeamForm";
import { AddPlayerForm } from "../players/AddPlayerForm";
export const SingleTeamPage = () => {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const [openedPlayer, setOpenedPlayer] = useState(false);

  const team = useSelector((state) => selectTeamById(state, Number(id)));
  const players = useSelector((state) =>
    selectPlayersListByTeamId(state, Number(team?.id))
  );

  if (!team) {
    return (
      <section>
        <h2>team not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Team">
        <EditTeamForm teamId={id} />
      </Modal>

      <Modal
        opened={openedPlayer}
        onClose={() => setOpenedPlayer(false)}
        title="Add Player"
      >
        <AddPlayerForm teamId={id} />
      </Modal>
      <Group position="center">
        <button
          className="btn btn-sm btn-outline btn-accent"
          onClick={() => {
            setOpened(true);
          }}
        >
          Edit Team
        </button>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => {
            setOpenedPlayer(true);
          }}
        >
          Add Player
        </button>
      </Group>
      <h2>{team.teamName}</h2>
      <ConfirmPlayerExcerpt players={players} />
    </article>
  );
};
