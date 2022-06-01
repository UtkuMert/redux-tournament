import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GamePerformancesList } from "../gamePerformances/GamePerformancesList";
import { GamePlayList } from "../gamePlays/GamePlayList";
import { selectStageTeamByStageId } from "../stageTeams/stageTeamsSlice";
import { TeamExcerpt } from "../teams/TeamExcerpt";
import { Link } from "react-router-dom";
import { AddTeamsMatchForm } from "../gamePlays/AddTeamsMatchForm";
import { Modal, Group } from "@mantine/core";
import { useState } from "react";

export const SingleStagePage = () => {
  const { stageId } = useParams();
  const [opened, setOpened] = useState(false);
  const teams = useSelector((state) =>
    selectStageTeamByStageId(state, Number(stageId))
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <AddTeamsMatchForm stageId={stageId} />
      </Modal>
      <Group position="center">
        <button
          className="btn btn-sm btn-outline btn-accent"
          onClick={() => {
            setOpened(true);
           
          }}
        >
          Match Teams
        </button>
      </Group>
      <div className="w-96">
        <TeamExcerpt teams={teams} />
        <div>
          <GamePlayList />
          <GamePerformancesList stageId={stageId} />
        </div>
      </div>
    </>
  );
};
