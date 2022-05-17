import { useSelector } from "react-redux";
import { selectAllTeams } from "./teamSlice";

export const TeamList = () => {
  const teams = useSelector(selectAllTeams);

  const renderedTeams = teams.map((team) => (
    <div key={team.id} className="card bg-base-100 shadow-xl w-96">
      <figure>
        <img
          src="https://api.lorem.space/image/shoes?w=400&h=225"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{team.name}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Team Details</button>
        </div>
      </div>
    </div>
  ));
  return (
    <section>
      <h2 className="flex justify-items-center">Teams</h2>
      <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
        {renderedTeams}
      </div>
    </section>
  );
};


