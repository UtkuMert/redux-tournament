import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextInput, Button, Modal, Select, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

import { selectTournamentById } from "../tournaments/tournamentSlice";
import { deleteStage, selectStageById, updateStage } from "./stageSlice";

const EditStageForm = ({ tournamentId, stageId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stage = useSelector((state) => selectStageById(state, Number(stageId)));
  const [stageName, setStageName] = useState(stage?.stageName);

  const tournament = useSelector((state) =>
    selectTournamentById(state, Number(tournamentId))
  );
  const [tournamentName, setTournamentName] = useState(
    tournament?.tournamentName
  );

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onSaveStageClicked = (value) => {
    try {
      const stageName = value.stageName;
      setAddRequestStatus("pending");
      dispatch(updateStage({ stageName, stageId })).unwrap();

      setStageName("");
      navigate("/");
    } catch (error) {
      console.error("Failed to save the stage", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };
  const onDeleteStageClicked = () => {
    try {
      setAddRequestStatus("pending");
      dispatch(deleteStage({ stageId })).unwrap();

      setStageName("");
      
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the tournament", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };
  const [data, setData] = useState(["Son32", "Son16", "Son8", "Son4", "Son2"]);

  const form = useForm({
    initialValues: {
      stageName: stageName,
    },

    validate: {
      stageName: (value) => (value.length > 0 ? null : "Select Stage Name"),
    },
  });
  return (
    <div>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit((value) => onSaveStageClicked(value))}>
          <Select
            label="Stage Name"
            data={data}
            value={stageName}
            placeholder="Select Stage Name"
            nothingFound="Nothing found"
            searchable
            required=""
            {...form.getInputProps("stageName")}
          />

          <TextInput
            label="Tournament"
            placeholder="Tournament Name"
            readOnly
            value={tournamentName}
          />
          <Group position="right" mt="md">
            <button
              className="btn btn-sm btn-outline btn-warning"
              type="submit"
            >
              Edit Stage
            </button>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={onDeleteStageClicked}
            >
              Delete Stage
            </button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default EditStageForm;
