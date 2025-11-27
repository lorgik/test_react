import Image from "next/image"
import IconDelete from "@/ui/IconDelete"
import IconHeart from "@/ui/IconHeart"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleFavorite, removeProduct } from "@/store/productSlice"
import { Product } from "@/types/product"
import { useState } from "react"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const fallbackSrc = "/stub.png"
    const [imgSrc, setImgSrc] = useState(product.imageUrl || fallbackSrc)

    const dispatch = useAppDispatch()

    const favoriteIds = useAppSelector((state) => state.products.favoriteIds)
    const isFavourite = favoriteIds.includes(product._id)

    function handleLike(e: React.MouseEvent, id: number) {
        e.preventDefault()
        e.stopPropagation()
        dispatch(toggleFavorite(id))
    }

    function handleDelete(e: React.MouseEvent, id: number) {
        e.preventDefault()
        e.stopPropagation()
        dispatch(removeProduct(id))
    }

    return (
        <div className="overflow-hidden relative">
            <div
                className="absolute top-2 left-2 p-2 bg-white rounded-full opacity-40 hover:opacity-100 cursor-pointer"
                onClick={(e) => handleLike(e, product._id)}
            >
                <IconHeart filled={isFavourite} />
            </div>
            <div
                className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-40 hover:opacity-100 cursor-pointer"
                onClick={(e) => handleDelete(e, product._id)}
            >
                <IconDelete />
            </div>

            <Image
                width={200}
                height={200}
                src={imgSrc}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-xl"
                onError={() => {
                    if (product.imageUrl !== fallbackSrc) {
                        setImgSrc(fallbackSrc)
                    }
                }}
            />
            <h3 className="mt-2 ml-2 font-bold truncate">{product.name}</h3>
        </div>
    )
}

export default ProductCard
