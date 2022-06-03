import { Table } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

export const HomeStageExcerpt = ({ stages }) => {
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
              <Link to={`/tournaments/${stage?.tournamentId}/stage/${stage.id}`}>View Stage</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
