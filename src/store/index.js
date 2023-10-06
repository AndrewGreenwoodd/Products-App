import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {quantity:0, showModal:false, items:[], showEditModal:false, productToDelete:null,showConfirmationModal:false}

const productSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers:{
        toggleModal(state){
            state.showModal = !state.showModal;
        },
        generateProductId(state,action){
            state.quantity = action.payload;
        },
        editProduct(state){
            state.showEditModal = !state.showEditModal
        },
        setProductToDelete: (state, action) => {
            state.productToDelete = action.payload;
            state.showConfirmationModal = true;
          },
          clearProductToDelete: (state) => {
            state.productToDelete = null;
            state.showConfirmationModal = false;
          },
    }
})


const store = configureStore({
    reducer:{
     product: productSlice.reducer
    }
})

export const productActions = productSlice.actions;
export default store;