import { Link } from "react-router-dom";

export const HomeNavbar = () => {
  return (
    <div className="w-full h-max flex justify-between items-center py-6 px-5 bg-gray-700">
      <div className="flex items-center space-x-6 divide-x-2 divide-white">
        <p className="text-white text-2xl font-sans font-medium">
          <Link to={"/"}>TURNUVAMVAR</Link>
        </p>
        <div className="flex items-end space-x-2 md:space-x-4 pl-6">
          <p className="text-white text-lg font-sans hover:text-gray-300">
            <Link to={"/tournaments"}>Tournaments</Link>
          </p>
          <p className="text-white text-lg font-sans hover:text-gray-300">
            <Link to={"/teams"}>Teams</Link>
          </p>
          <p className="text-white text-lg font-sans hover:text-gray-300">
            <Link to={"/players"}>Players</Link>
          </p>
          <p className="text-white text-lg font-sans hover:text-gray-300">
            <Link to={"/stages"}>Stages</Link>
          </p>
        </div>
      </div>
      <button className="py-3 px-5 rounded-lg border border-gray-400 text-white bg-slate-700 hover:bg-slate-900 font-sans">
        <Link to={"/admin"}>Admin Panel</Link>{" "}
      </button>
    </div>
  );
};
