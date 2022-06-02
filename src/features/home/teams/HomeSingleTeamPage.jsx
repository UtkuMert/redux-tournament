import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPlayersError,
  getPlayersStatus,
  selectPlayerByTeamId,
} from "../../admin/players/playerSlice";
import { selectTeamById } from "../../admin/teams/teamSlice";
import { HomePlayerExcerpt } from "../players/HomePlayerExcerpt";

export const HomeSingleTeamPage = () => {
  const { id } = useParams();
  const team = useSelector((state) => selectTeamById(state, Number(id)));
  const players = useSelector((state) =>
    selectPlayerByTeamId(state, Number(id))
  );

  return (
    <div className="w-full h-full flex flex-col gap-8 py-5 px-10">
      <div className="w-full flex gap-4 divide-x-2">
        <div className="flex gap-2  w-4/12">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-sans font-bold pb-4">{team.teamName}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 divide-y-2">
          <p className="text-2xl font-sans font-medium pb-4 text-center">
            Players
          </p>
          <div className="p-10 flex flex-wrap items-center">
            {" "}
            <HomePlayerExcerpt players={players} />
          </div>
        </div>
      </div>
      {/* <NextGames />
			<PlayedGames /> */}
    </div>
  );
};
