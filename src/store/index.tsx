import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import setAuthSlice from './setAuthSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: setAuthSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
