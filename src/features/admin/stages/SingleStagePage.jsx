import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GamePerformancesList } from "../gamePerformances/GamePerformancesList";
import { GamePlayList } from "../gamePlays/GamePlayList";
import { selectStageTeamByStageId } from "../stageTeams/stageTeamsSlice";
import { TeamExcerpt } from "../teams/TeamExcerpt";
import { Modal, Group } from "@mantine/core";
import { useState } from "react";
import { AddStageTeamsForm } from "../stageTeams/AddStageTeamsForm";

export const SingleStagePage = () => {
  const { stageId } = useParams();
  console.log(stageId)
  const [opened, setOpened] = useState(false);
  const teams = useSelector((state) =>
    selectStageTeamByStageId(state, Number(stageId))
  );
  console.log(teams)
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Match Teams"
      >
        <AddStageTeamsForm stageId={stageId} />
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
