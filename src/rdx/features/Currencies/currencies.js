import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import {
    v4 as uuidv4
} from "uuid";

export const fetchAllCurrencies = createAsyncThunk(
    'currencies/fetchAllCurrencies',
    async () => {
        const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`;
        try {
            const responce = await fetch(url);
            const data = await responce.json();
            return data;
        } catch (error) {
            throw new Error('error');
        }


    }
);

export const fetchCurrency = createAsyncThunk(
    'currencies/fetchCurrency', // Уникальное имя для этого санка
    async (cur) => {
        const code = cur.toUpperCase();
        const date = new Date;
        const curYear = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month <= 9) {
            month = '0' + month;
        }
        const day = date.getDate();
        const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${code}&date=${''+curYear+month+day}&json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            // Обработка ошибок, если запрос не удался
            throw Error('Failed to fetch data');
        }
    }
);

export const fetchDateCurrency = createAsyncThunk(
    'currencies/fetchDateCurrency',
    async (props) => {
        const startDate = props.startDate,
            endDate = props.endDate,
            cur = props.cur;
        const url = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${startDate}&end=${endDate}&valcode=${cur}&sort=exchangedate&order=desc&json`;
        console.log(url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            return data;
        } catch (error) {
            throw Error('Failed to fetch data');
        }
    }
);

const setError = (state, action) => {
    state.currencyStatus = 'rejected';
    state.currencyError = action.payload;
}

const initialState = {
    currencyData: [],
    currencyStatus: 'loading',
    currencyError: null,
    oneCurrencyData: {},
    oneCurrencyStatus: 'loading',
    oneCurrencyError: null,
    datesData: [],
    ratesData: [],
    dateCurrencyStatus: 'loading',
    dateCurrencyError: null,
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchAllCurrencies.pending]: (state) => {
            state.currencyStatus = 'loading';
            state.currencyError = null;
            console.log('pending');
        },
        [fetchAllCurrencies.fulfilled]: (state, action) => {
            state.currencyStatus = 'resolved';
            state.currencyData = action.payload;
            state.currencyData.forEach((item) => {
                Object.assign(item, {
                    id: uuidv4(),
                });
            });
        },
        [fetchAllCurrencies.rejected]: setError,
        [fetchCurrency.pending]: (state) => {
            state.oneCurrencyStatus = 'loading';
            state.oneCurrencyError = null;
            console.log('pending');
        },
        [fetchCurrency.fulfilled]: (state, action) => {
            state.oneCurrencyStatus = 'resolved';
            state.oneCurrencyData = action.payload;
            state.datesData = [];
            state.ratesData = [];
        },
        [fetchCurrency.rejected]: setError,
        [fetchDateCurrency.pending]: (state) => {
            state.dateCurrencyStatus = 'loading';
            state.dateCurrencyError = null;
            console.log('pending');

        },
        [fetchDateCurrency.fulfilled]: (state, action) => {
            state.dateCurrencyStatus = 'resolved';
            state.datesData = [];
            state.ratesData = [];
            const tempData = action.payload;
            tempData.forEach((item) => {
                state.datesData.push(item.exchangedate);
                state.ratesData.push(item.rate);
            })
            console.log(state.datesData);

        },
        [fetchDateCurrency.rejected]: setError,
    }
})

// Action creators are generated for each case reducer function
// export const {

// } = currencySlice.actions

export default currencySlice.reducer