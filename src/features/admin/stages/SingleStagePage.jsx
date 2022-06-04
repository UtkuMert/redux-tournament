import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GamePerformancesList } from "../gamePerformances/GamePerformancesList";
import { GamePlayList } from "../gamePlays/GamePlayList";
import { selectStageTeamByStageId } from "../stageTeams/stageTeamsSlice";
import { TeamExcerpt } from "../teams/TeamExcerpt";
import { Modal, Group, Card } from "@mantine/core";
import { useState } from "react";
import { AddStageTeamsForm } from "../stageTeams/AddStageTeamsForm";
import { selectStageById } from "./stageSlice";
import { AddTeamsMatchForm } from "../gamePlays/AddTeamsMatchForm";

export const SingleStagePage = () => {
  const { stageId } = useParams();
  console.log(stageId);
  const [opened, setOpened] = useState(false);
  const [openedTeams, setOpenedTeams] = useState(false);
  const teams = useSelector((state) =>
    selectStageTeamByStageId(state, Number(stageId))
  );
  const stage = useSelector((state) => selectStageById(state, Number(stageId)));
  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 space-y-8">
      <div className="flex justify-between items-start w-full">
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Add Teams To Stage"
        >
          <AddStageTeamsForm stageId={stageId} />
        </Modal>
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="text-white bg-orange-500 border border-orange-700 hover:bg-orange-400 py-4 px-6 rounded-xl font-sans font-medium text-lg"
        >
          Add Teams To Stage
        </button>
        <div className="flex flex-col">
          <Card
            shadow={"sm"}
            p="xl"
            className="p-10 flex flex-col items-center justify-center max-w-lg rounded-lg"
          >
            <Card.Section>
              <p className="text-2xl font-sans font-semibold">
                {stage?.stageName}
              </p>
            </Card.Section>
          </Card>
        </div>
        <>
          <Modal
            opened={openedTeams}
            onClose={() => setOpenedTeams(false)}
            title="Match Teams"
          >
            <AddTeamsMatchForm stageId={stageId} />
          </Modal>
        </>
        <button
          onClick={() => {
            setOpenedTeams(true);
          }}
          className="text-white bg-orange-500 border border-orange-700 hover:bg-orange-400 py-4 px-6 rounded-xl font-sans font-medium text-lg"
        >
          Match Teams
        </button>
      </div>
      <div>
        <TeamExcerpt teams={teams} />
        <div>
          <GamePlayList />
          <GamePerformancesList stageId={stageId} />
        </div>
      </div>
    </div>
  );
};

{
  /* <>
  <Modal opened={opened} onClose={() => setOpened(false)} title="Match Teams">
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
</>; */
}
