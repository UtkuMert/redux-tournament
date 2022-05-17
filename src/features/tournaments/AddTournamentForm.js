import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { tournamentAdded } from "./tournamentSlice";
import { selectAllTeams } from "../teams/teamSlice";

export const AddTournamentForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teamId, setTeamId] = useState("");

  const teams = useSelector(selectAllTeams);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onTeamChanged = (e) => setTeamId(e.target.value);

  const onSaveTournamentClicked = () => {
    if (title && description) {
      dispatch(
        tournamentAdded(title, description, teamId) // burada uzun yazmak yerine reducer ile bu bilgiler almayi sagladik
      );
      setTitle(""); // sonrasinda sayfayi temizlemek icin
      setDescription("");
    }
  };
  const canSave = Boolean(title) && Boolean(description) && Boolean(teamId);
  
  const teamsOptions = teams.map((team) => (
    <option key={team.id} value={team.id}>
      {team.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Tournament</h2>
      <form className="flex flex-direction">
        <label htmlFor="tournamentTitle">Tournament Title:</label>
        <input
          type="text"
          id="tournamentTitle"
          name="tournamentTitle"
          value={title}
          onChange={onTitleChanged}
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="teamAuthor">Team:</label>
        <select id="postAuthor" value={teamId} onChange={onTeamChanged}>
          <option value=""></option>
          {teamsOptions}
        </select>
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
