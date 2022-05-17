import { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewTeam } from "./teamSlice";

export const AddTeamForm = () => {
  const dispatch = useDispatch();

  const [teamName, setTeamName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onNameChange = (e) => setTeamName(e.target.value);

  const canSave =
    [teamName].every(Boolean) && addRequestStatus === "idle";
    const onSaveTournamentClicked = () => {
      if (canSave) {
        try {
          setAddRequestStatus("pending");
          dispatch(addNewTeam({ teamName})).unwrap();
  
          setTeamName("");
        } catch (error) {
          console.error("Failed to save the post", error);
        } finally {
          setAddRequestStatus("idle");
        }
      }
    };
  
  return (
    <section>
      <h2>Add a New Team</h2>
      <form className="flex flex-direction">
        <label htmlFor="teamName">Team Name:</label>
        <input
          type="text"
          id="teamName"
          name="teamName"
          value={teamName}
          onChange={onNameChange}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          type="button"
          onClick={onSaveTournamentClicked}
          className="btn btn-active"
          disabled={!canSave}
        >
          Save Team
        </button>
      </form>
    </section>
  );
};
