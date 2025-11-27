import React from "react"
import Image from "next/image"

interface ProductImageProps {
    src: string
}

const ProductImage = ({ src }: ProductImageProps) => {
    const [imgSrc, setImgSrc] = React.useState(src)
    const fallbackSrc = "/stub.png"

    return (
        <Image
            width={253}
            height={394}
            src={imgSrc}
            alt="Product"
            className="w-[30%] bg-stone-100 rounded-2xl shrink-0"
            onError={() => {
                if (imgSrc !== fallbackSrc) {
                    setImgSrc(fallbackSrc)
                }
            }}
        />
    )
}

export default ProductImage
