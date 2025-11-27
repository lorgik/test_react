"use client"

import * as React from "react"
import { useGetProductByIdQuery } from "@/store/api"
import { useAppSelector } from "@/store/hooks"
import Link from "next/link"
import Title from "@/ui/Title"
import Button from "@/ui/Button"
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
            <div className="pt-10 min-h-screen px-5">
                <div className="flex items-center gap-10 mb-6">
                    <Link href="/">
                        <Button>Return to home</Button>
                    </Link>
                </div>

                <div className="flex flex-row gap-10 items-start mt-10">
                    <ProductImage src="/stub.png" />
                    <div className="mt-2">
                        <Title>{productFromStore.name}</Title>
                        <div className="flex gap-10 mt-5 flex-wrap">
                            <MediaList title="Films" items={productFromStore.films} />
                            <MediaList title="Short Films" items={productFromStore.shortFilms} />
                            <MediaList title="TV Shows" items={productFromStore.tvShows} />
                            <MediaList title="Video Games" items={productFromStore.videoGames} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const { data: product, isLoading, error } = useGetProductByIdQuery(numericId)

    if (isLoading) {
        return (
            <div className="pt-10 px-5">
                <div className="flex items-center gap-10">
                    <Title>Loading...</Title>
                    <Link href="/">
                        <Button>Return to home</Button>
                    </Link>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="pt-10 px-5">
                <div className="flex items-center gap-10">
                    <Title>Character not found</Title>
                    <Link href="/">
                        <Button>Return to home</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-10 min-h-screen px-5">
            <div className="flex items-center gap-10 mb-6">
                <Link href="/">
                    <Button>Return to home</Button>
                </Link>
            </div>

            <div className="flex flex-row gap-10 items-start mt-10">
                <ProductImage src={product.imageUrl} />
                <div className="mt-2">
                    <Title>{product.name}</Title>
                    <div className="flex gap-10 mt-5 flex-wrap">
                        <MediaList title="Films" items={product.films} />
                        <MediaList title="Short Films" items={product.shortFilms} />
                        <MediaList title="TV Shows" items={product.tvShows} />
                        <MediaList title="Video Games" items={product.videoGames} />
                    </div>
                </div>
            </div>
        </div>
    )
}
