import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import React from "react";
import { selectTeamById } from "../teams/teamSlice";
import { selectPlayersListByTeamId } from "../playersList/playerListSlice";
import { selectGamePerformanceById } from "../gamePerformances/gamePerformances";
import { Box, MultiSelect, Group } from "@mantine/core";
import { addNewScorePlayers } from "./scorePlayerSlice";

export const AddScorePlayerForm = ({ gamePerformanceId }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const gamePerformance = useSelector((state) =>
    selectGamePerformanceById(state, Number(gamePerformanceId))
  );
  console.log('lOOOO2',gamePerformance)
  const firstTeam = useSelector((state) =>
    selectTeamById(state, Number(gamePerformance?.firstTeamId))
  );
  const secondTeam = useSelector((state) =>
    selectTeamById(state, Number(gamePerformance?.secondTeamId))
  );

  const firstTeamScore = gamePerformance?.scoreOfFirstTeam;
  const secondTeamScore = gamePerformance?.scoreOfSecondTeam;

  const firstTeamPlayers = useSelector((state) =>
    selectPlayersListByTeamId(state, Number(firstTeam?.id))
  );

  const firstTeamPlayersData = [];

  firstTeamPlayers?.map((player) =>
    firstTeamPlayersData.push({
      value: player?.id,
      label: player?.playerFirstName,
    })
  );

  const secondTeamPlayers = useSelector((state) =>
    selectPlayersListByTeamId(state, Number(secondTeam?.id))
  );
  const secondTeamPlayersData = [];
  secondTeamPlayers?.map((player) =>
    secondTeamPlayersData.push({
      value: player?.id,
      label: player?.playerFirstName,
    })
  );

  const onSaveScorePlayerClicked = (values) => {
    try {
      setAddRequestStatus("pending");

      values?.firstTeamPlayers?.map((value) =>
        dispatch(
          addNewScorePlayers({ value, id: gamePerformance?.scoreOfFirstTeamId })
        ).unwrap()
      );

      values?.secondTeamPlayers?.map((value) =>
        dispatch(
          addNewScorePlayers({ value, id: gamePerformance?.scoreOfSecondTeamId })
        ).unwrap()
      );
    } catch (error) {
      console.error("Failed to save the score player", error);
    } finally {
    }
  };

  const form = useForm({
    initialValues: {
      firstTeamPlayers: "",
      secondTeamPlayers: "",
    },
  });
  return (
    <div>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => onSaveScorePlayerClicked(values))}
        >
          {firstTeamScore === 0 ? null : (
            <MultiSelect
              data={firstTeamPlayersData}
              label="Players for score"
              placeholder="Select Players"
              searchable
              maxSelectedValues={firstTeamScore}
              {...form.getInputProps("firstTeamPlayers")}
            />
          )}

          {secondTeamScore === 0 ? null : (
            <MultiSelect
              data={secondTeamPlayersData}
              label="Players for score"
              placeholder="Select Players"
              searchable
              maxSelectedValues={secondTeamScore}
              {...form.getInputProps("secondTeamPlayers")}
            />
          )}

          <Group position="right" mt="md">
            <button className="btn btn-sm btn-wide btn-secondary" type="submit">
              Score Player
            </button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
