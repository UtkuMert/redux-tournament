import React from "react";
import { Table } from "@mantine/core";
import { Link } from "react-router-dom";

export const StageExcerpt = ({stages}) => {
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
    <thead>
      <tr>
        <th>Tournament Id</th>
        <th>Stage Name</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {stages?.map(stage => (
        <tr key={stage.id}>
        <td>{stage.id}</td>
        <td>{stage.stageName}</td>
        <td></td>
        <td> <Link to={`tournament/stage/${stage.id}`}>View Stage</Link></td>
        <td><Link to={`tournament/addteam/${stage.id}`}>Add Team To Stage</Link></td>
      </tr>
      ))}
    </tbody>
  </Table>
  );
};

{/* <div>
{stages?.map((stage) => (
  <p key={stage?.id}>{stage?.stageName}</p>
))}
</div> */}