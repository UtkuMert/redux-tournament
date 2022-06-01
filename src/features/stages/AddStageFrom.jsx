import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextInput, Button, Modal, Select, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

import { selectTournamentById } from "../tournaments/tournamentSlice";
import { addNewStage } from "./stageSlice";

export const AddStageFrom = ({ tournamentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tournament = useSelector((state) =>
    selectTournamentById(state, Number(tournamentId))
  );
  const [tournamentName, setTournamentName] = useState(
    tournament?.tournamentName
  );

  const [stageName, setStageName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onSaveStageClicked = (value) => {
    try {
      const stageName = value.stageName;
      setAddRequestStatus("pending");
      dispatch(addNewStage({ stageName, tournamentId })).unwrap();

      setStageName("");
      navigate("/");
    } catch (error) {
      console.error("Failed to save the stage", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const [data, setData] = useState(["Son32", "Son16", "Son8", "Son4", "Son2"]);

  const form = useForm({
    initialValues: {
      stageName: "",
    },

    validate: {
      stageName: (value) =>
        value.length > 0 ? null : "Select Stage Name",
    },
  });
  return (
    <div>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit((value) => onSaveStageClicked(value))}>
          <Select
            label="Stage Name"
            data={data}
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
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
