import { useSelector } from "react-redux";
import { selectAllTournaments } from "../tournaments/tournamentSlice";


export const TeamTournament = ({tournamentId}) => {
    const tournaments = useSelector(selectAllTournaments)

    const tournament = tournaments.find(tournament => tournament.id === tournamentId);

    return <span>by {tournament ? tournament.tournamentName : 'Unknown'}</span>
}
