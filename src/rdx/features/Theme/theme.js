import {
    createSlice
} from '@reduxjs/toolkit'

const initialState = {
    darkTheme: false,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.darkTheme = !state.darkTheme;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    changeTheme,
} = themeSlice.actions

export default themeSlice.reducer