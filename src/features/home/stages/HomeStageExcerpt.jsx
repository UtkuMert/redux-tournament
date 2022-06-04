import { Table } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

export const HomeStageExcerpt = ({ stages }) => {
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th></th>
          <th>Stage Name</th>
          <th>Tournament Name</th>
        </tr>
      </thead>
      <tbody>
        {stages?.map((stage,index) => (
          <tr key={stage.id}>
            <td>{index}</td>
            <td>{stage?.stageName}</td>
            <td>{stage.tournamentName}</td>
            <td>
              <Link to={`/tournaments/${stage?.tournamentId}/stage/${stage.id}`}><button className="btn btn-sm btn-info">View Stage</button></Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
