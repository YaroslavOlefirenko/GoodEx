import {
    configureStore
} from '@reduxjs/toolkit'
import themeReducer from './features/Theme/theme';
import currencyReducer from './features/Currencies/currencies';
import favouriteReducer from './features/Fav/favourite';
export const store = configureStore({
    reducer: {
        theme: themeReducer,
        currency: currencyReducer,
        favourite: favouriteReducer,
    },
})