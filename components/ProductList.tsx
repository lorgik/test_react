import Link from "next/link"
import ProductCard from "./ProductCard"
import { Product } from "@/types/product"

interface ProductListProps {
    products: Product[]
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

export default function ProductList({ products, ...props }: ProductListProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-10" {...props}>
            {products.map((product) => (
                <Link href={`/products/${product._id}`} className="block" key={product._id}>
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    )
}
