import React from "react";
import { CardShow } from "../CardShow";

export const HomeTournamentExcerpt = ({ tournaments }) => {
  return (
    <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
      {tournaments?.map((tournament) => {
        let info = {
          id: tournament?.id,
          name: tournament?.tournamentName,
          description: tournament?.description,
        };
        return <CardShow parameter={info} key={tournament?.id} />;
      })}
    </div>
  );
};

