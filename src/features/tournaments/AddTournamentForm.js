import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNewTournament } from "./tournamentSlice";

export const AddTournamentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tournamentName, setTournamentName] = useState("");
  const [description, setDescription] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTournamentNameChanged = (e) => setTournamentName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave =
    [tournamentName, description].every(Boolean) && addRequestStatus === "idle";

  const onSaveTournamentClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewTournament({ tournamentName, description })).unwrap();

        setTournamentName("");
        setDescription("");
        navigate("/");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form>
        <div className="mb-6">
          <label
            htmlFor="tournamentName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Tournament Name
          </label>
          <input
            type="text"
            id="tournamentName"
            name="tournamentName"
            value={tournamentName}
            onChange={onTournamentNameChanged}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter A Tournament Name"
            required=""
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="tournamentDescription"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Tournament Description
          </label>
          <input
            type="text"
            id="tournamentDescription"
            name="tournamentDescription"
            value={description}
            onChange={onDescriptionChanged}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>

        <button
          type="button"
          onClick={onSaveTournamentClicked}
          disabled={!canSave}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add A Tournament
        </button>
      </form>
    </div>
  );
};
