import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basket: localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : []
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addBasket: (state, action) => {
            const current = state.basket.find(o => o.id === action.payload.id)
            if (current) {
                state.basket = state.basket.filter(o => o.id !== current.id)
                state.basket = [...state.basket, { ...current, count: current.count + 1 }]
                localStorage.setItem("basket", JSON.stringify(state.basket))
            }
            else {
                state.basket = [...state.basket, { ...action.payload, count: 1 }]
                localStorage.setItem("basket", JSON.stringify(state.basket))
            }
        },
        reduceItemCount: (state, action) => {          
            const newArr = state.basket.map((b) => {
                if (b.id === action.payload) {
                    return { ...b, count: b.count - 1 }
                }
                return b;
            })
            state.basket = newArr
            if (state.basket.find(o => o.id === action.payload).count < 1) {
                state.basket = state.basket.filter(o => o.id !== action.payload)
            }
            localStorage.setItem("basket", JSON.stringify(state.basket))

        },
        increaseItemCount: (state, action) => {
            const newArr = state.basket.map((b) => {
                if (b.id === action.payload) {
                    return { ...b, count: b.count + 1 }
                }
                return b;
            })
            state.basket = newArr
            localStorage.setItem("basket", JSON.stringify(state.basket))
        },
        removeItem: (state, action) => {
            state.basket = state.basket.filter(o => o.id !== action.payload)
            localStorage.setItem("basket", JSON.stringify(state.basket))
        }

    }
})



export const { addBasket, reduceItemCount, increaseItemCount, removeItem } = basketSlice.actions
export default basketSlice.reducer