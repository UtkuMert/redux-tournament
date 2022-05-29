import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextInput, Button, Group } from "@mantine/core";

import { selectTournamentById } from "../tournaments/tournamentSlice";
import { addNewStage } from "./stageSlice";
const AddStageFrom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const tournament = useSelector((state) =>
    selectTournamentById(state, Number(id))
  );
  const [tournamentName, setTournamentName] = useState(
    tournament?.tournamentName
  );

  const [stageName, setStageName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onNameChange = (e) => setStageName(e.target.value);

  const canSave = [stageName].every(Boolean) && addRequestStatus === "idle";

  const onSaveStageClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewStage({ stageName, id })).unwrap();

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
      <h2>Add Team</h2>
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

export default AddStageFrom;
