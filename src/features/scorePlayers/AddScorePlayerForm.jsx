import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import React from "react";
import { selectTeamById } from "../teams/teamSlice";
import { selectPlayersListByTeamId } from "../playersList/playerListSlice";

export const AddScorePlayerForm = ({ firstTeamId, secondTeamId }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState("");
  const firstTeam = useSelector((state) =>
    selectTeamById(state, Number(firstTeamId))
  );
  const secondTeam = useSelector((state) =>
    selectTeamById(state, Number(secondTeamId))
  );

  const onFirstNameChange = (e) => setPlayerId(e.target.value);

  const firstTeamPlayers = useSelector((state) =>
    selectPlayersListByTeamId(state, Number(firstTeam.id))
  );

  const secondTeamPlayers = useSelector((state) =>
    selectPlayersListByTeamId(state, Number(secondTeam.id))
  );

  const firsTeamPlayersOptions = firstTeamPlayers.map((firstTeamPlayer) => (
    <option key={firstTeamPlayer.id} value={firstTeamPlayer.id}>
      {firstTeamPlayer.playerFirstName}
    </option>
  ));
  return (
    <div>
      <label htmlFor="Team 1 Player">Player:</label>
      <select id="player" value={playerId} onChange={onFirstNameChange}>
        <option value=""></option>
        {firsTeamPlayersOptions}
      </select>
    </div>
  );
};
