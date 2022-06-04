export const HomeGamePlayedExcerpt = ({ gamePerformances }) => {
  return (
    <div className="content-center w-4/5 mx-auto">
      {gamePerformances?.map((gamePerformance) => (
        <div
          key={gamePerformance.id}
          className="flex justify-center flex-col w-full lg:flex-row mt-2"
        >
          <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
            <p>{gamePerformance?.firstTeamName}</p>
          </div>
          <div className="divider lg:divider-horizontal">
            <p>{gamePerformance?.scoreOfFirstTeam}-  {gamePerformance?.scoreOfSecondTeam}</p>
           
          </div>
          <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
            <p>{gamePerformance?.secondTeamName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
