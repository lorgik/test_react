"use client"

import * as React from "react"
import { useGetProductByIdQuery } from "@/store/api"
import { useAppSelector } from "@/store/hooks"
import Link from "next/link"
import Title from "@/ui/Title"
import Button from "@/ui/Button"
import FlexRow from "@/ui/FlexRow"
import MediaList from "@/components/MediaList"
import ProductImage from "@/components/ProductImage"

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = React.use(params)
    const numericId = Number(id)

    const createdProducts = useAppSelector((state) => state.products.createdProducts)
    const productFromStore = createdProducts.find((p) => p._id === numericId)

    if (productFromStore) {
        return (
            <>
                <Link href="/">
                    <Button>Return to home</Button>
                </Link>

                <div className="flex flex-row gap-10 items-start mt-10">
                    <ProductImage src="/stub.png" />

                    <div className="mt-2">
                        <Title>{productFromStore.name}</Title>

                        <div className="flex flex-col flex-wrap gap-10 mt-5">
                            <MediaList title="Films" items={productFromStore.films} />
                            <MediaList title="Short Films" items={productFromStore.shortFilms} />
                            <MediaList title="TV Shows" items={productFromStore.tvShows} />
                            <MediaList title="Video Games" items={productFromStore.videoGames} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const { data: product, isLoading, error } = useGetProductByIdQuery(numericId)

    if (isLoading) {
        return (
            <FlexRow>
                <Title>Loading...</Title>
                <Link href="/">
                    <Button>Return to home</Button>
                </Link>
            </FlexRow>
        )
    }

    if (error || !product) {
        return (
            <FlexRow>
                <Title>Character not found</Title>
                <Link href="/">
                    <Button>Return to home</Button>
                </Link>
            </FlexRow>
        )
    }

    return (
        <>
            <FlexRow>
                <Title>Product</Title>
                <Link href="/">
                    <Button>Return to home</Button>
                </Link>
            </FlexRow>

            <div className="flex flex-row gap-10 items-start mt-10">
                <ProductImage src={product.imageUrl} />

                <div className="mt-2">
                    <Title>{product.name}</Title>

                    <div className="flex flex-col flex-wrap gap-10 mt-5">
                        <MediaList title="Films" items={product.films} />
                        <MediaList title="Short Films" items={product.shortFilms} />
                        <MediaList title="TV Shows" items={product.tvShows} />
                        <MediaList title="Video Games" items={product.videoGames} />
                    </div>
                </div>
            </div>
        </>
    )
}
