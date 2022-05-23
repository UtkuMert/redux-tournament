import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { addNewTeam } from "./teamSlice";
import { selectAllTournaments,selectTournamentById } from "../tournaments/tournamentSlice";

export const AddTeamForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const tournament = useSelector((state) =>
  selectTournamentById(state, Number(id))
);
const [tournamentName, setTournamentName] = useState(
  tournament?.tournamentName
);

  const [teamName, setTeamName] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const tournaments = useSelector(selectAllTournaments);

  const onNameChange = (e) => setTeamName(e.target.value);
  const onTournamentChanged = (e) => setTournamentId(e.target.value);

  const canSave =
    [teamName,id ].every(Boolean) && addRequestStatus === "idle";

  const onSaveTournamentClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewTeam({ teamName, id })).unwrap();

        setTeamName("");
        //setTournamentId("");
        navigate("/")
      } catch (error) {
        console.error("Failed to save the team", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  // const tournamentsOptions = tournaments.map((tournament) => (
  //   <option key={tournament?.id} value={tournament?.id}>
  //     {tournament?.tournamentName}
  //   </option>
  // ));
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
        <label htmlFor="tournament">Tournament:</label>
        <input readOnly value={tournamentName} />
        {/* <select
          id="tournament"
          value={tournamentId}
          onChange={onTournamentChanged}
        >
          <option value=""></option>
          {tournamentsOptions}
        </select> */}
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
