import {
    createSlice,
} from '@reduxjs/toolkit'


const initialState = {
    favCur: [],
    sort: '',
}

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addCur(state, action) {
            state.favCur = JSON.parse(localStorage.favCur);
            if (!state.favCur.includes(action.payload.cur)) {
                state.favCur.unshift(action.payload.cur);
            }
            localStorage.favCur = JSON.stringify(state.favCur);
        },
        removeCur: (state, action) => {
            state.favCur = JSON.parse(localStorage.favCur);
            state.favCur = [...state.favCur.slice(0, state.favCur.indexOf(action.payload.cur)), ...state.favCur.slice((state.favCur.indexOf(action.payload.cur) + 1))];
            localStorage.favCur = JSON.stringify(state.favCur);
        },
        startCur: (state) => {
            if (localStorage.getItem('favCur') !== null) {
                state.favCur = JSON.parse(localStorage.favCur);
            } else {
                localStorage.favCur = JSON.stringify(state.favCur);
            }

        },
        setSort: (state, action) => {
            state.sort = action.payload.sort;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    addCur,
    removeCur,
    startCur,
    setSort,
} = favouriteSlice.actions

export default favouriteSlice.reducer