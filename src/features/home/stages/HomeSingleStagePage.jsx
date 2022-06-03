import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectStageTeamByStageId } from "../../admin/stageTeams/stageTeamsSlice";
import { HomeGameWillPlayList } from "../gamesWillPlay/HomeGameWillPlayList";

import { HomeTeamExcerpt } from "../teams/HomeTeamExcerpt";

export const HomeSingleStagePage = () => {
  const { stageId } = useParams();
  const teams = useSelector((state) =>
    selectStageTeamByStageId(state, Number(stageId))
  );
  console.log(stageId);
  return (
    <div>
      <HomeTeamExcerpt teams={teams} />
      <div>
        <HomeGameWillPlayList />
      {/* <GamePerformancesList stageId={stageId} />  */}
      </div>
    </div>
  );
};
