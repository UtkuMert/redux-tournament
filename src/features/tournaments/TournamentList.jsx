import { useSelector } from "react-redux";
import { selectAllTournaments } from "./tournamentSlice";

export const TournamentList = () => {
  const tournaments = useSelector(selectAllTournaments);

  const renderedTournaments = tournaments.map((tournament) => (
    <div key={tournament.id} className="card bg-base-100 shadow-xl w-96">
      <figure>
        <img
          src="https://api.lorem.space/image/shoes?w=400&h=225"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tournament.title}</h2>
        <p>{tournament.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  ));
  return (
    <section>
      <h2>Tournaments</h2>
      <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
        {renderedTournaments}
      </div>
    </section>
  );
};
