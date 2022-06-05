import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, TextInput, Select, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

import { selectTournamentById } from "../tournaments/tournamentSlice";
import { addNewStage } from "./stageSlice";
import toast, { Toaster } from "react-hot-toast";

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
      toast("Aşama Eklendi.");
      setStageName("");
      toast("Takım aşamaya eklendi.");
      navigate("/admin");
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
      stageName: (value) => (value.length > 0 ? null : "Select Stage Name"),
    },
  });
  return (
    <div>
      <Toaster />
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
          <Group position="center" mt="md">
            <button className="btn btn-sm btn-wide btn-secondary" type="submit">
              Add Stage
            </button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
