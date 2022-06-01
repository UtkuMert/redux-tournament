import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Modal, Button, Group } from "@mantine/core";
import { AddStageTeamsForm } from "../stageTeams/AddStageTeamsForm";
import EditStageForm from "./EditStageForm";

export const StageExcerpt = ({ stages }) => {
  const [opened, setOpened] = useState(false);
  const [openedSecond, setOpenedSecond] = useState(false);
  const [stageId, setStageId] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>Stage Id</th>
          <th>Stage Name</th>
        </tr>
      </thead>
      <tbody>
        {stages?.map((stage) => (
          <tr key={stage.id}>
            <td>{stage.id}</td>
            <td>{stage.stageName}</td>
            <td>
              <Link to={`${stage.id}`}>View Stage</Link>
            </td>
            <td>
              <Modal
                opened={openedSecond}
                onClose={() => setOpenedSecond(false)}
                title="Edit Stage"
              >
                <EditStageForm tournamentId={tournamentId} stageId={stageId} />
              </Modal>
              <Group position="center">
                <Button
                  onClick={() => {
                    setOpenedSecond(true);
                    setTournamentId(stage?.tournamentId);
                    setStageId(stage?.id);
                  }}
                >
                  Edit Stage
                </Button>
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
                <Button
                  onClick={() => {
                    setOpened(true);
                    setStageId(stage?.id);
                  }}
                >
                  Add Team To Stage
                </Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

{
  /* <div>
{stages?.map((stage) => (
  <p key={stage?.id}>{stage?.stageName}</p>
))}
</div> */
}
