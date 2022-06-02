import React from 'react'
import { CardShow } from '../CardShow';

export const HomeTeamExcerpt = ({teams}) => {
  return (
    <div className="p-10 flex flex-wrap gap-5 justify-between items-center">
      {teams?.map((team) => {
        let info = {
          id: team?.id,
          name: team?.teamName,
        };
        return <CardShow parameter={info} key={team?.id} />;
      })}
    </div>
  )
}
