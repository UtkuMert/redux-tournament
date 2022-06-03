import React from "react";

export const HomeGameWillPlayExcerpt = ({ gamePlays }) => {
  return (
    <div className="content-center">
      {gamePlays.map((gamePlay) => (
        <div className="flex justify-center flex-col w-full lg:flex-row mt-2">
          <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
            {gamePlay.firstTeamName}
          </div>
          <div className="divider lg:divider-horizontal">VS</div>
          <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
            {gamePlay.secondTeamName}
          </div>
        </div>
      ))}
    </div>
  );
};
