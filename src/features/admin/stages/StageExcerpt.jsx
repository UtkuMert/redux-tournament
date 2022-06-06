import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Modal, Group } from "@mantine/core";
import { AddStageTeamsForm } from "../stageTeams/AddStageTeamsForm";
import EditStageForm from "./EditStageForm";
import { deleteStage } from "./stageSlice";
import { useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
export const StageExcerpt = ({ stages }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [openedSecond, setOpenedSecond] = useState(false);
  const [stageId, setStageId] = useState("");
  const [tournamentId, setTournamentId] = useState("");

  const onDeleteTournamentClicked = (id) => {
    try {
      console.log(id);
      dispatch(deleteStage({ id })).unwrap();
      toast("Aşama Silindi.");
      
    } catch (err) {
      console.error("Failed to delete the tournament", err);
    }
  };

  return (
    <>
      <Toaster />
      <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
        <thead>
          <tr>
            <th></th>
            <th>Stage Name</th>
            <th>Tournament Name</th>
          </tr>
        </thead>
        <tbody>
          {stages?.map((stage, index) => (
            <tr key={stage.id}>
              <td>{index}</td>
              <td>{stage.stageName}</td>
              <td>{stage.tournamentName}</td>
              <td>
                <Link
                  to={`/admin/tournament/${stage?.tournamentId}/stage/${stage.id}`}
                >
                  <button className="btn btn-sm btn-info">View Stage</button>
                </Link>
              </td>
              <td>
                <Modal
                  opened={openedSecond}
                  onClose={() => setOpenedSecond(false)}
                  title="Edit Stage"
                >
                  <EditStageForm
                    tournamentId={tournamentId}
                    stageId={stageId}
                  />
                </Modal>
                <Group position="center">
                  <button
                    className="btn btn-sm btn-outline btn-warning"
                    onClick={() => {
                      setOpenedSecond(true);
                      setTournamentId(stage?.tournamentId);
                      setStageId(stage?.id);
                    }}
                  >
                    Edit Stage
                  </button>
                </Group>
              </td>
              <td>
                <Modal
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="Add Team To Stage"
                >
                  <AddStageTeamsForm stageId={stageId} />
                </Modal>
                <Group position="center">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      setOpened(true);
                      setStageId(stage?.id);
                    }}
                  >
                    Add Team To Stage
                  </button>
                </Group>
              </td>
              <td>
                <Group position="center">
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      console.log(stage?.id);
                      onDeleteTournamentClicked(stage?.id);
                    }}
                  >
                    <MdCancel />
                  </button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
