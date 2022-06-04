

export const HomeGameWillPlayExcerpt = ({ gamePlays }) => {
  return (
    <div className="content-center w-4/5 mx-auto">
      {gamePlays.map((gamePlay) => (
        <div
          key={gamePlay?.id}
          className="flex justify-center flex-col w-full lg:flex-row mt-2"
        >
          <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
            <p>{gamePlay.firstTeamName}</p>
          </div>
          <div className="divider lg:divider-horizontal">VS</div>
          <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
            <p>{gamePlay.secondTeamName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
