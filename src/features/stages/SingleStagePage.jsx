import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GamePerformancesList } from "../gamePerformances/GamePerformancesList";
import { GamePlayList } from "../gamePlays/GamePlayList";
import { selectStageTeamByStageId } from "../stageTeams/stageTeamsSlice";
import { TeamExcerpt } from "../teams/TeamExcerpt";

export const SingleStagePage = () => {
  const { stageId } = useParams();

  const teams = useSelector((state) =>
    selectStageTeamByStageId(state, Number(stageId))
  );

  return (
    <>
      <div className="w-96">
        <TeamExcerpt teams={teams} />
        <div>
          <GamePlayList />
          <GamePerformancesList />
        </div>
      </div>
    </>
  );
};
