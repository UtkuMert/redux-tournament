import ScoreList from "../scores/ScoreList";

export const HomeGamePlayedExcerpt = ({ gamePerformances }) => {
  return (
    <div className="h-full w-full">
      {gamePerformances?.map((gamePerformance) => (
        <div
          key={gamePerformance?.id}
          className="flex justify-center items-center flex-col w-full lg:flex-row mt-2 h-full"
        >
          <div className="flex flex-col flex-grow gap-2">
            <div className="py-4 flex-grow bg-base-300 flex justify-center items-center rounded-lg h-16">
              {gamePerformance?.firstTeamName}
            </div>
            <div className="h-12">
              <ScoreList scoreId={gamePerformance?.scoreOfFirstTeamId} />
            </div>
          </div>
          <div className="divider lg:divider-horizontal">
            {gamePerformance?.scoreOfFirstTeam}-
            {gamePerformance?.scoreOfSecondTeam}
          </div>
          <div className="flex flex-col flex-grow gap-2">
            <div className="py-4 flex-grow bg-base-300 flex justify-center items-centerrounded-lg h-16">
              {gamePerformance?.secondTeamName}
            </div>
            <div className="h-12">
              <ScoreList scoreId={gamePerformance?.scoreOfSecondTeamId} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
