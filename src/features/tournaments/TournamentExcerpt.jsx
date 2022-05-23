import { Link } from "react-router-dom";
import { Table } from "@mantine/core";

export const TournamentExcerpt = ({ tournaments }) => {



  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>Tournament Id</th>
          <th>Tournament Name</th>
          <th>Tournament Description</th>
        </tr>
      </thead>
      <tbody>
        {tournaments?.map(tournament => (
          <tr key={tournament.id}>
          <td>{tournament.id}</td>
          <td>{tournament.tournamentName}</td>
          <td>{tournament.description}</td>
          <td> <Link to={`tournament/${tournament.id}`}>View Tournament</Link></td>
          <td><Link to={`tournament/addteam/${tournament.id}`}>Add Team</Link></td>
        </tr>
        ))}
      </tbody>
    </Table>
  );
  // return (
  //   <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
  //     <figure>
  //       <img
  //         src="https://api.lorem.space/image/shoes?w=400&h=225"
  //         className="rounded-t-lg"
  //         alt="Tournament"
  //       />
  //     </figure>
  //     <div className="p-5">
  //       <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tournament.tournamentName}</h2>
  //       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{tournament.description}</p>
  //       <Link to={`tournament/${tournament.id}`}>View Tournament</Link>
  //       <Link to={`tournament/addteam/${tournament.id}`}>Add Team</Link>
  //       <div className="card-actions justify-end">
  //         <button className="btn btn-primary">Details</button>
  //       </div>
  //     </div>
  //   </div>
  // );
};
