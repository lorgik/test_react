import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ProductsApiResponse, ProductApiResponse, FetchedProduct, Product } from "@/types/product"
import { setTotalPages } from "./paginationSlice"

const addIsFavourite = (item: FetchedProduct): Product => ({
    ...item,
    isFavourite: false,
})

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.disneyapi.dev/" }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], { page?: number; pageSize?: number }>({
            queryFn: async ({ page = 1, pageSize = 50 }, { dispatch }, _, baseQuery) => {
                const response = await baseQuery(`character?page=${page}&pageSize=${pageSize}`)

                if (response.error) {
                    return { error: response.error }
                }

                const data: ProductsApiResponse = response.data as ProductsApiResponse

                dispatch(setTotalPages(data.info.totalPages))

                return { data: data.data.map(addIsFavourite) }
            },
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `character/${id}`,
            transformResponse: (response: ProductApiResponse) => addIsFavourite(response.data),
        }),
    }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi
