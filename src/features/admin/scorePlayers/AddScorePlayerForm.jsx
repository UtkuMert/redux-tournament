import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import React from "react";
import { selectTeamById } from "../teams/teamSlice";
import { selectPlayersListByTeamId } from "../playersList/playerListSlice";
import { selectGamePerformanceById } from "../gamePerformances/gamePerformances";

export const AddScorePlayerForm = ({ gamePerformanceId }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState("");

  const gamePerformance = useSelector((state) =>
    selectGamePerformanceById(state, Number(gamePerformanceId))
  );

  const firstTeam = useSelector((state) =>
    selectTeamById(state, Number(gamePerformance?.firstTeamId))
  );
  const secondTeam = useSelector((state) =>
    selectTeamById(state, Number(gamePerformance?.secondTeamId))
  );

  const onFirstNameChange = (e) => setPlayerId(e.target.value);

  console.log(gamePerformance);
  const firstTeamScore = gamePerformance?.scoreOfFirstTeam;
  const secondTeamScore = gamePerformance?.scoreOfSecondTeam;

  const firstTeamPlayers = useSelector((state) =>
    selectPlayersListByTeamId(state, Number(firstTeam?.id))
  );

  const secondTeamPlayers = useSelector((state) =>
    selectPlayersListByTeamId(state, Number(secondTeam?.id))
  );

  const firstTeamPlayersOptions = firstTeamPlayers.map((firstTeamPlayer) => (
    <option key={firstTeamPlayer.id} value={firstTeamPlayer.id}>
      {firstTeamPlayer.playerFirstName}
    </option>
  ));
  const secondTeamPlayersOptions = secondTeamPlayers.map((secondTeamPlayer) => (
    <option key={secondTeamPlayer.id} value={secondTeamPlayer.id}>
      {secondTeamPlayer.playerFirstName}
    </option>
  ));

  const scoreFirstTeamArray = [];

  for (let i = 0; i < firstTeamScore; i++) {
    scoreFirstTeamArray.push(i);
  }
  const scoreSecondTeamArray = [];

  for (let i = 0; i < secondTeamScore; i++) {
    scoreSecondTeamArray.push(i);
  }

  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex flex-col gap-3">
        <p>First Team</p>
        {scoreFirstTeamArray?.map((score) => (
          <>
            <label htmlFor="Team 1 Player">Player for score {score + 1}:</label>

            <select id="player" value={playerId} onChange={onFirstNameChange}>
              <option value=""></option>
              {firstTeamPlayersOptions}
            </select>
          </>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p>Second Team</p>
        {scoreSecondTeamArray?.map((score) => (
          <>
            <label htmlFor="Team 1 Player">Player for score {score + 1}:</label>

            <select id="player" value={playerId} onChange={onFirstNameChange}>
              <option value=""></option>
              {secondTeamPlayersOptions}
            </select>
          </>
        ))}
      </div>
    </div>
  );
};
