import { fetchTournaments, selectTournamentById } from "./tournamentSlice";

import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "@mantine/core";
import {
  selectTeamByTournamentId,
} from "../teams/teamSlice";

import { TeamExcerpt } from "../teams/TeamExcerpt";

export const SingleTournamentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tournament = useSelector((state) =>
    selectTournamentById(state, Number(id))
  );

  const teams = useSelector((state) =>
  selectTeamByTournamentId(state, Number(id))
);

  // useEffect(() => {
  //   if (teams?.teamsStatus === "idle") {
  //     dispatch(fetchTournaments({ id }));
  //   }
  // }, [teams?.teamsStatus, dispatch]);

  if (!tournament) {
    return (
      <section>
        <h2>tournament not found!</h2>
      </section>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 pt-10 space-y-8">
      <div className="flex justify-between items-start w-full">
        <Link
          to={`/admin/tournament/edit/${id}`}
          className="text-white bg-orange-500 border border-orange-700 hover:bg-orange-400 py-4 px-6 rounded-xl font-sans font-medium text-lg"
        >
          Edit Tournament
        </Link>
        <div className="flex flex-col">
          <Card shadow={"sm"} p="xl" className="p-10 flex flex-col items-center justify-center max-w-lg rounded-lg">
            <Card.Section>
              <p className="text-2xl font-sans font-semibold">{tournament?.tournamentName}</p>
            </Card.Section>
            <Card.Section>
              <p className="text-lg font-sans">{tournament?.description}</p>
            </Card.Section>
          </Card>
        </div>

        <Link
          to={`/admin/tournament/${id}/stage`}
          className="text-white bg-orange-500 border border-orange-700 hover:bg-orange-400 py-4 px-6 rounded-xl font-sans font-medium text-lg"
        >
          Stage
        </Link>
      </div>
      <TeamExcerpt teams={teams} />
    </div>
  );
};
