import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectStageTeamByStageId } from "../../admin/stageTeams/stageTeamsSlice";
import { HomeGamePlayedList } from "../gamePlayed/HomeGamePlayedList";
import { HomeGameWillPlayList } from "../gamesWillPlay/HomeGameWillPlayList";

import { HomeTeamExcerpt } from "../teams/HomeTeamExcerpt";

export const HomeSingleStagePage = () => {
  const { stageId } = useParams();
  const teams = useSelector((state) =>
    selectStageTeamByStageId(state, Number(stageId))
  );
  return (
    <div>
      <HomeTeamExcerpt teams={teams} />
      <div>
        <div className="bg-red-50 mt-5 w-3/6 mx-auto">
          <HomeGameWillPlayList />
        </div>
        <div className="pt-3 mt-5 w-3/6 mx-auto bg-red-50">
          <HomeGamePlayedList stageId={stageId} />
        </div>
      </div>
    </div>
  );
};
