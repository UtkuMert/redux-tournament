import { Table } from '@mantine/core';
import React from 'react'
import { useDispatch } from 'react-redux';

export const HomePlayerExcerpt = ({players}) => {
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th>Player Id</th>
          <th>Player Name</th>
          <th>Team id</th>
          <th>Player Address</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {players?.map((player) => (
          <tr key={player.id}>
            <td>{player.id}</td>
            <td>{player.playerFirstName + " " + player.playerLastName}</td>
            <td>{player.teamId}</td>
            <td>{player.playerAddress}</td>
            <td>{player.position}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
