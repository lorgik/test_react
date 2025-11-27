"use client"

import { configureStore } from "@reduxjs/toolkit"
import { productApi } from "./api"
import productReducer from "./productSlice"
import paginationReducer from "./paginationSlice"

let store: ReturnType<typeof makeStore>

function makeStore() {
    return configureStore({
        reducer: {
            [productApi.reducerPath]: productApi.reducer,
            products: productReducer,
            pagination: paginationReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
    })
}

export function getStore() {
    if (typeof window === "undefined") return makeStore()
    if (!store) store = makeStore()
    return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
