import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import productReducer, { nextSlide } from "./features/productSlice";

export const store = configureStore({
    reducer : {
        basket : basketReducer,
        product : productReducer
    }
})
setInterval(() => {
    store.dispatch(nextSlide())
} , 5000)