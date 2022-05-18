import { Link } from "react-router-dom";



export const TournamentExcerpt = ({ tournament }) => {
  return (
    <div className="card bg-base-100 shadow-xl w-96">
      <figure>
        <img
          src="https://api.lorem.space/image/shoes?w=400&h=225"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tournament.tournamentName}</h2>
        <p>{tournament.description}</p>
        <Link to={`tournament/${tournament.id}`}>View Tournament</Link>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
};


