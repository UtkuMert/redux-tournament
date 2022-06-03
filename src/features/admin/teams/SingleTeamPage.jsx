import { useSelector } from "react-redux";
import { selectTeamById } from "./teamSlice";
import { useState } from "react";
import { selectPlayersListByTeamId } from "../playersList/playerListSlice";
import { Link, useParams } from "react-router-dom";
import { Table, Modal, Button, Group, Card } from "@mantine/core";
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
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 space-y-8">
      <div className="flex justify-between items-start w-full">
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Edit Team"
        >
          <EditTeamForm teamId={id} />
        </Modal>
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="text-white bg-purple-800 border border-purple-700 hover:bg-purple-600 py-4 px-6 rounded-xl font-sans font-medium text-lg"
        >
          Edit Team
        </button>
        <div className="flex flex-col">
          <Card
            shadow={"sm"}
            p="xl"
            className="p-10 flex flex-col items-center justify-center max-w-lg rounded-lg bg-slate-200"
          >
            <Card.Section>
              <p className="text-2xl font-sans font-semibold">
                {team?.teamName}
              </p>
            </Card.Section>
          </Card>
        </div>
        <Modal
          opened={openedPlayer}
          onClose={() => setOpenedPlayer(false)}
          title="Add Player"
        >
          <AddPlayerForm teamId={id} />
        </Modal>
        <button
          onClick={() => {
            setOpenedPlayer(true);
          }}
          className="text-white bg-purple-800 border border-purple-700 hover:bg-purple-600 py-4 px-6 rounded-xl font-sans font-medium text-lg"
        >
          Add Player
        </button>
      </div>
      <ConfirmPlayerExcerpt players={players} />
    </div>
  );
};

{
  /* <article>
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
</article> */
}
