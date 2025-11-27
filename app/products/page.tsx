// app/products/page.tsx
"use client"

import { useState } from "react"
import { useGetProductsQuery } from "@/store/api"
import { useAppSelector } from "@/store/hooks"
import Title from "@/ui/Title"
import Button from "@/ui/Button"
import ProductList from "@/components/ProductList"
import Search from "@/components/Search"

export default function ProductsPage() {
    const [page, setPage] = useState(1)
    const pageSize = 50

    const {
        data: apiProducts = [],
        isLoading,
        error,
        isFetching,
    } = useGetProductsQuery({
        page,
        pageSize,
    })

    const totalPages = useAppSelector((state) => state.pagination.totalPages)

    const { createdProducts, deletedIds, favoriteIds } = useAppSelector((state) => state.products)

    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const allProducts = [...apiProducts, ...createdProducts]

    const notDeletedProducts = allProducts.filter((p) => !deletedIds.includes(p._id))

    const filteredByFavorite = showFavoritesOnly
        ? notDeletedProducts.filter((p) => favoriteIds.includes(p._id))
        : notDeletedProducts

    const filteredBySearch = searchTerm
        ? filteredByFavorite.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : filteredByFavorite

    if (isLoading) {
        return (
            <div className="py-10 px-5">
                <Title>Loading...</Title>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-10 px-5">
                <Title>Failed to load characters</Title>
            </div>
        )
    }

    function handlePagePrevious() {
        setPage((prev) => Math.max(prev - 1, 1))
    }
    function handlePageNext() {
        setPage((prev) => Math.min(prev + 1, totalPages || 1))
    }

    const isPreviousDisabled = page <= 1 || isFetching
    const isNextDisabled = page >= (totalPages || 1) || isFetching

    return (
        <div className="py-10 px-5">
            <div className="flex items-center justify-between gap-10 flex-wrap">
                <div className="flex items-center gap-10">
                    <Title>Products</Title>
                    <Button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
                        {showFavoritesOnly ? "Show All" : "Show Favorites"}
                    </Button>
                </div>
                <Search onSearch={setSearchTerm} />
            </div>
            <ProductList products={filteredBySearch} />

            <div className="grid grid-cols-3 gap-4 mt-10 max-w-max mx-auto">
                <Button onClick={handlePagePrevious} disabled={isPreviousDisabled}>
                    Previous
                </Button>
                <span className="self-center text-center">
                    Page {page} of {totalPages || 1}
                </span>
                <Button onClick={handlePageNext} disabled={isNextDisabled}>
                    Next
                </Button>
            </div>
        </div>
    )
}
