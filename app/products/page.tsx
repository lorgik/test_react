"use client"

import { useState } from "react"
import { useGetProductsQuery } from "@/store/api"
import { useAppSelector } from "@/store/hooks"
import Title from "@/ui/Title"
import Button from "@/ui/Button"
import ProductList from "@/components/ProductList"
import Search from "@/components/Search"
import PaginationControls from "@/components/PaginationControls"
import FlexRow from "@/ui/FlexRow"

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
        return <Title>Loading...</Title>
    }

    if (error) {
        return <Title>Failed to load characters</Title>
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
        <>
            <FlexRow className="justify-between">
                <div className="flex items-center gap-10">
                    <Title>Products</Title>
                    <Button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
                        {showFavoritesOnly ? "Show All" : "Show Favorites"}
                    </Button>
                </div>

                <Search onSearch={setSearchTerm} />
            </FlexRow>

            <ProductList products={filteredBySearch} />

            <PaginationControls
                currentPage={page}
                totalPages={totalPages || 1}
                isFetching={isFetching}
                onPageChange={setPage}
            />
        </>
    )
}
