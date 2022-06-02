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
  const secondTeamPlayersOptions = firstTeamPlayers.map((secondTeamPlayer) => (
    <option key={secondTeamPlayer.id} value={secondTeamPlayer.id}>
      {secondTeamPlayer.playerFirstName}
    </option>
  ));
 console.log(firstTeamScore)
  const someFunction = () => {
    for(var i = 0; i<firstTeamScore; i++){
        console.log(i);
        (<p>Deneme</p>);
    }
  }
  return (
    <div>
      {someFunction()}
      <label htmlFor="Team 1 Player">Player:</label>
      <select id="player" value={playerId} onChange={onFirstNameChange}>
        <option value=""></option>
        {firstTeamPlayersOptions}
      </select>
      <label htmlFor="Team 2 Player">Player:</label>
      <select id="player" value={playerId} onChange={onFirstNameChange}>
        <option value=""></option>
        {secondTeamPlayersOptions}
      </select>
    </div>
  );
};
