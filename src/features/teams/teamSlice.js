import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Takim 1" },
  { id: "1", name: "Takim 2" },
  { id: "2", name: "Takim 3" },
];

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    teamAdded: {
        reducer(state, action) {
            state.push(action.payload);
          },
          prepare(name) {
            return {
              payload: {
                id: nanoid(),
                name,
              },
            };
          },
    }
  },
});

export const selectAllTeams = (state) => state.teams;

export const {teamAdded} = teamSlice.actions
export default teamSlice.reducer;
