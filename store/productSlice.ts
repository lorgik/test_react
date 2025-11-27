import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "@/types/product"

interface ProductsState {
    createdProducts: Product[]
    deletedIds: number[]
    favoriteIds: number[]
}

const initialState: ProductsState = {
    createdProducts: [],
    deletedIds: [],
    favoriteIds: [],
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.createdProducts.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            const id = action.payload
            if (!state.deletedIds.includes(id)) {
                state.deletedIds.push(id)
            }
            state.createdProducts = state.createdProducts.filter((p) => p._id !== id)
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const index = state.favoriteIds.indexOf(id)
            if (index === -1) {
                state.favoriteIds.push(id)
            } else {
                state.favoriteIds.splice(index, 1)
            }
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const updatedProduct = action.payload
            const index = state.createdProducts.findIndex((p) => p._id === updatedProduct._id)
            if (index !== -1) {
                state.createdProducts[index] = updatedProduct
            }
        },
    },
})

export const { addProduct, removeProduct, toggleFavorite, updateProduct } = productSlice.actions
export default productSlice.reducer
