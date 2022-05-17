import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Takim 1' },
    { id: '1', name: 'Takim 2' },
    { id: '2', name: 'Takim 3' }
]

const teamSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default teamSlice.reducer