import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "Tournament 1", description: "First tournament" },
  { id: "2", title: "Tournament 2", description: "Second tournament" },
  { id: "3", title: "Tournament 3", description: "Third tournament" },
];

const tournamentSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    tournamentAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, description){
          return{
              payload: {
                  id: nanoid(),
                  title,
                  description
              }
          }
      }
    },
  },
});
export const selectAllTournaments = (state) => state.tournaments;

export const { tournamentAdded } = tournamentSlice.actions;

export default tournamentSlice.reducer;
