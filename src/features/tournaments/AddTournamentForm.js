import { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewTournament } from "./tournamentSlice";

export const AddTournamentForm = () => {
  const dispatch = useDispatch();

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
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Add a New Tournament</h2>
      <form className="flex flex-direction">
        <label htmlFor="tournamentName">Tournament Name:</label>
        <input
          type="text"
          id="tournamentName"
          name="tournamentName"
          value={tournamentName}
          onChange={onTournamentNameChanged}
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="tournamentDescription">Tournament Description:</label>
        <input
          type="text"
          id="tournamentDescription"
          name="tournamentDescription"
          value={description}
          onChange={onDescriptionChanged}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          type="button"
          onClick={onSaveTournamentClicked}
          className="btn btn-active"
          disabled={!canSave}
        >
          Save Tournament
        </button>
      </form>
    </section>
  );
};
