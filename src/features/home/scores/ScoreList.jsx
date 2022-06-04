import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchScorePlayers, getScorePlayersError, getScorePlayersStatus, selectAllScorePlayers, selectScorePlayerByScoreId } from '../../admin/scorePlayers/scorePlayerSlice';

const ScoreList = ({scoreId}) => {
    console.log(scoreId);
    const dispatch = useDispatch();
  const scorePlayers = useSelector((state) => selectScorePlayerByScoreId(state, Number(scoreId)));
  const scorePlayersStatus = useSelector(getScorePlayersStatus);
  const scorePlayersError = useSelector(getScorePlayersError);
  
  useEffect(() => {
    if (scorePlayersStatus === "idle") {
      dispatch(fetchScorePlayers());
    }
  }, [scorePlayersStatus, dispatch]);
console.log("AAAAAAAAAAAAA",scorePlayers);
//   let content;
//   if (teamsStatus === "loading") {
//     content = <p>"Loading"</p>;
//   } else if (teamsStatus === "succeeded") {
//     content = <HomeTeamExcerpt teams={teams} />;
//   } else if (teamsStatus === "failed") {
//     content = <p>{teamsError}</p>;
//   }
  return (
    <div>
        {scorePlayers.map(score => (
            <p key={scorePlayers.id}>{score?.playerFirstName}</p>
        ))}
    </div>
  )
}

export default ScoreList