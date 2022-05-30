import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextInput, Button, Modal, Group } from "@mantine/core";

import { selectTournamentById } from "../tournaments/tournamentSlice";
import { addNewStage } from "./stageSlice";

export const AddStageFrom = ({tournamentId}) => {
  const dispatch = useDispatch();
  //const { id } = useParams();
  const navigate = useNavigate();
  console.log(tournamentId)
  const tournament = useSelector((state) =>
    selectTournamentById(state, Number(tournamentId))
  );
  const [tournamentName, setTournamentName] = useState(
    tournament?.tournamentName
  );

  const [stageName, setStageName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [opened, setOpened] = useState(false);

  const onNameChange = (e) => setStageName(e.target.value);

  const canSave = [stageName].every(Boolean) && addRequestStatus === "idle";

  const onSaveStageClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewStage({ stageName, tournamentId })).unwrap();

        setStageName("");
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
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form>
          <TextInput
            type="text"
            id="stageName"
            label="Stage Name"
            placeholder="Stage Name"
            value={stageName}
            onChange={onNameChange}
            required=""
          />
          <TextInput
            label="Tournament"
            placeholder="Tournament Name"
            readOnly
            value={tournamentName}
          />
          <Group position="right" mt="md">
            <Button
              onClick={onSaveStageClicked}
              type="button"
              disabled={!canSave}
              color="teal"
              className="btn btn-active"
            >
              Add Stage
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
