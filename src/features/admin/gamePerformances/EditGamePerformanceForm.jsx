import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addGamePerformance, selectGamePerformedByGameToPlayId, updateGamePerformance } from "./gamePerformances";
import { Box, NumberInput, TextInput, Group } from "@mantine/core";

export const EditGamePerformanceForm = ({
  gameToPlayId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gamePerformance = useSelector((state) =>
    selectGamePerformedByGameToPlayId(state, Number(gameToPlayId))
  );
  const [scoreOfFirstTeam, setScoreOfFirstTeam] = useState(gamePerformance?.scoreOfFirstTeam);
  const [scoreOfSecondTeam, setScoreOfSecondTeam] = useState(gamePerformance?.scoreOfSecondTeam);

  const [firstTeamName, setFirstTeamName] = useState(gamePerformance?.firstTeamName);
  const [secondTeamName, setSecondTeamName] = useState(gamePerformance?.secondTeamName);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const gamePerformanceId = gamePerformance?.id
  const onSaveScoreClicked = () => {
    try {
      setAddRequestStatus("pending");
      dispatch(
        updateGamePerformance({
          gamePerformanceId,
          gameToPlayId,
          scoreOfFirstTeam,
          scoreOfSecondTeam,
        })
      ).unwrap();
      setScoreOfFirstTeam("");
      setScoreOfSecondTeam("");
    } catch (error) {
      console.error("Failed to save the matches", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };
  return (
    <div>
      <div>
        <Box sx={{ maxWidth: 640 }} mx="auto">
          <form>
            <TextInput
              label="Team 1"
              placeholder="Team 1 Name"
              readOnly
              value={firstTeamName}
            />
            <NumberInput
              defaultValue={scoreOfFirstTeam}
              min={0}
              id="scoreOfFirstTeam"
              label="Team 1 Score"
              placeholder="Team 1 Score"
              value={scoreOfFirstTeam}
              onChange={(scoreOfFirstTeam) =>
                setScoreOfFirstTeam(scoreOfFirstTeam)
              }
              required
              stepHoldDelay={500}
              stepHoldInterval={100}
            />
            <TextInput
              label="Team 2"
              placeholder="Team 2 Name"
              readOnly
              value={secondTeamName}
            />
            <NumberInput
              defaultValue={scoreOfSecondTeam}
              min={0}
              id="scoreOfSecondTeam"
              label="Team 2 Score"
              placeholder="Team 2 Score"
              value={scoreOfSecondTeam}
              onChange={(scoreOfSecondTeam) =>
                setScoreOfSecondTeam(scoreOfSecondTeam)
              }
              required
              stepHoldDelay={500}
              stepHoldInterval={100}
            />
            <Group position="right" mt="md">
              <button
                className="btn btn-sm btn-wide btn-secondary"
                onClick={onSaveScoreClicked}
                type="button"
              >
                Update Score
              </button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};
