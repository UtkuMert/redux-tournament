export const HomeGamePlayedExcerpt = ({ gamePerformances }) => {
  return (
    <div className="content-center w-full">
      {gamePerformances?.map((gamePerformance) => (
        <div key={gamePerformance.id} className="flex justify-center flex-col w-full lg:flex-row mt-2">
          <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
            {gamePerformance?.firstTeamName}
          </div>
          <div>
            <h2>GOL YUSUF</h2>
          </div>
          <div className="divider lg:divider-horizontal">{gamePerformance?.scoreOfFirstTeam}-{gamePerformance?.scoreOfSecondTeam}</div>
          <div className="grid flex-grow h-16 card bg-base-300 rounded-box place-items-center">
            {gamePerformance?.secondTeamName}
          </div>
        </div>
      ))}
    </div>
  );
};
