import { Table } from '@mantine/core';
import React from 'react'


export const HomePlayerExcerpt = ({players}) => {
  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr>
          <th></th>
          <th>Player Name</th>
          <th>Team Name</th>
          <th>Player Address</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {players?.map((player, index) => (
          <tr key={player.id}>
            <td>{index+1}</td>
            <td>{player.playerFirstName + " " + player.playerLastName}</td>
            <td>{player.teamName}</td>
            <td>{player.playerAddress}</td>
            <td>{player.position}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
