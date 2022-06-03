import React from "react";
import { HomeGamePlayedList } from "../features/home/gamePlayed/HomeGamePlayedList";
import { HomeGameWillPlayList } from "../features/home/gamesWillPlay/HomeGameWillPlayList";

export const Games = () => {
  return (
    <div>
      <HomeGameWillPlayList />
      <HomeGamePlayedList />
    </div>
  );
};
