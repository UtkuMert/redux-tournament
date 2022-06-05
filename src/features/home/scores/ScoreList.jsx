import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchScorePlayers,
  getScorePlayersError,
  getScorePlayersStatus,
  selectAllScorePlayers,
  selectScorePlayerByScoreId,
} from "../../admin/scorePlayers/scorePlayerSlice";
import { BiFootball } from "react-icons/bi";

const ScoreList = ({ scoreId }) => {
  console.log("aaaaaaaaaaaaaaaa", scoreId);
  const dispatch = useDispatch();
  const scorePlayers = useSelector((state) =>
    selectScorePlayerByScoreId(state, Number(scoreId))
  );
  const scorePlayersStatus = useSelector(getScorePlayersStatus);
  const scorePlayersError = useSelector(getScorePlayersError);

  useEffect(() => {
    if (scorePlayersStatus === "idle") {
      dispatch(fetchScorePlayers());
    }
  }, [scorePlayersStatus, dispatch]);

  return (
    <div>
      {scorePlayers.map((score) => (
        <div className="flex items-center w-full justify-start p-2 space-x-4">
          <BiFootball size={"1.2rem"}/>
          <p key={scorePlayers.id}>{score?.playerFirstName}</p>
        </div>
      ))}
    </div>
  );
};

export default ScoreList;
