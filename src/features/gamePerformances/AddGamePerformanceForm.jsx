import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addGamePerformance } from "./gamePerformances";
import {
  Box,
  NumberInput,
  TextInput,
  Button,
  Modal,
  Group,
} from "@mantine/core";
export const AddGamePerformanceForm = ({
  gameToPlayId,
  firstTeamName,
  secondTeamName,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scoreOfFirstTeam, setScoreOfFirstTeam] = useState("");
  const [scoreOfSecondTeam, setScoreOfSecondTeam] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const canSave =
    [scoreOfFirstTeam, scoreOfSecondTeam].every(Boolean) &&
    addRequestStatus === "idle";

  const onSaveScoreClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addGamePerformance({
            gameToPlayId,
            scoreOfFirstTeam,
            scoreOfSecondTeam,
          })
        ).unwrap();
        setScoreOfFirstTeam("");
        setScoreOfSecondTeam("");
        navigate("/");
      } catch (error) {
        console.error("Failed to save the stage", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div>
      <div>
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <form>
            <TextInput
              label="Team 1"
              placeholder="Team 1 Name"
              readOnly
              value={firstTeamName}
            />
            <NumberInput
              defaultValue={0}
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
              defaultValue={0}
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
            ;
            <Group position="right" mt="md">
              <Button
                onClick={onSaveScoreClicked}
                type="button"
                disabled={!canSave}
                color="teal"
                className="btn btn-active"
              >
                Save Score
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};
