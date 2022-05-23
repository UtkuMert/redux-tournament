import { Link } from "react-router-dom";
import { Table } from "flowbite";

export const PlayerExcerpt = ({ player }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {player.playerFirstName}
        </h2>
      <p>{player.playerAddress}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
};
