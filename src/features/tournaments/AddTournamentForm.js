import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { tournamentAdded } from "./tournamentSlice";

export const AddTournamentForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const onSaveTournamentClicked = () => {
    if (title && description) {
      dispatch(
        tournamentAdded(title, description) // burada uzun yazmak yerine reducer ile bu bilgiler almayi sagladik
      );
      setTitle(""); // sonrasinda sayfayi temizlemek icin
      setDescription("");
    }
  };

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
        <label htmlFor="tournamentDescription">Tournament Description:</label>
        <input
          type="text"
          id="tournamentDescription"
          name="tournamentDescription"
          value={description}
          onChange={onDescriptionChanged}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="button" onClick={onSaveTournamentClicked} className="btn btn-active">
          Save Tournament
        </button>
      </form>
    </section>
  );
};
