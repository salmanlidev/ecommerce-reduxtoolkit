import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    loading: false ,
    products : [] , 
    filteredProduct : [] ,
    slider : 0 ,
    sliderLast : 2 , 
    sliderContent : []  
}

export const getProduct = createAsyncThunk("getProduct" , async() => {
    const { data } = await axios.get(`https://fakestoreapi.com/products`)
    return await data
})

export const productSlice = createSlice({
    name:"product",
    initialState ,
    reducers : {
        searchProduct : (state , action) => {
            state.filteredProduct = state.products.filter(o => o.title.toLowerCase().includes(action.payload.toLowerCase()))
        } , 
        nextSlide : (state ) => {
            if(state.slider === state.sliderLast ){
                state.slider = 0
               
            }
            else {
                state.slider++
                
            }
        },
        prevSlide : (state ) => {
            if(state.slider === 0 ){
                state.slider = state.sliderLast
               
            }
            else {
                state.slider--
              
            }
        },
        dotSlide : (state , action) => {
            state.slider = action.payload
        } 
    } ,
    extraReducers : (builder) => {
        builder.addCase(getProduct.pending , (state) => {
            state.loading = true
            if(state.loading){
                state.sliderContent = []
            }
        })
        builder.addCase(getProduct.fulfilled , (state , action) => {
            // console.log(action.payload)
            state.products = action.payload

            for(let  i = 3 ; i < 6 ; i++){
                state.sliderContent.push(state.products[i])
            }

            state.loading = false
        })
    }
})


export const { searchProduct , nextSlide , prevSlide , dotSlide  , pushSliderContent } = productSlice.actions 
export default productSlice.reducer