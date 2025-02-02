import { configureStore } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from "./services/apiSlice";
import authReducer from "./feature/authSlice";
// import sidebarReducer from "@/redux/feature/sidebarSlice";

export const makeStore = () =>configureStore({

    reducer:{[apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        // sidebar: sidebarReducer,
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:process.env.NODE_ENV != 'production'
})


export type AppStore=ReturnType<typeof makeStore>;
export type RootState=ReturnType<AppStore['getState']>;
export type AppDispacher=AppStore['dispatch'];
