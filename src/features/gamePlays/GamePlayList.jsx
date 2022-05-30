import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGamePlaysError, getGamePlaysStatus, selectAllGamePlays, fetchGameToPlay } from "./gamePlaysSlice";
import {GamePlayExcerpt} from "./GamePlayExcerpt"
export const GamePlayList = () => {
    const dispatch = useDispatch();

    const gamePlays = useSelector(selectAllGamePlays);
    const gamePlayStatus = useSelector(getGamePlaysStatus);
    const error = useSelector(getGamePlaysError);


    useEffect(() => {
        if (gamePlayStatus === "idle") {
          dispatch(fetchGameToPlay());
        }
      }, [gamePlayStatus, dispatch]);


      let content;
      if (gamePlayStatus === "loading") {
        content = <p>"Loading"</p>;
      } else if (gamePlayStatus === "succeeded") {
        content = <GamePlayExcerpt gamePlays={gamePlays} />;
      } else if (gamePlayStatus === "failed") {
        content = <p>{error}</p>;
      }


  return (

    <section>
      <h2>Games</h2>
      <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
        {content}
      </div>
    </section>
   
  )
}

