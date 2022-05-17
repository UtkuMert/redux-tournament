import { useState } from "react";
import { useDispatch } from "react-redux";

import { teamAdded } from "./teamSlice";

export const AddTeamForm = () => {

    const [name, setName] = useState("")
    const dispatch = useDispatch();

    const onNameChange = (e) => setName(e.target.value);

    const onSaveTournamentClicked = () => {
        if (name) {
          dispatch(
            teamAdded(name) // burada uzun yazmak yerine reducer ile bu bilgiler almayi sagladik
          );
          setName(""); // sonrasinda sayfayi temizlemek icin
          
        }
      };
      const canSave = Boolean(name);
  return (
     <section>
      <h2>Add a New Team</h2>
      <form className="flex flex-direction">
        <label htmlFor="teamName">Team Name:</label>
        <input
          type="text"
          id="teamName"
          name="teamName"
          value={name}
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
  )
}

