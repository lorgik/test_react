"use client"

import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { updateProduct } from "@/store/productSlice"
import { Product } from "@/types/product"
import Link from "next/link"
import Title from "@/ui/Title"
import Button from "@/ui/Button"
import Input from "@/ui/Input"
import ProductCard from "@/components/ProductCard"

export default function EditProductPage() {
    const [choosenProduct, setChoosenProduct] = useState<Product | null>(null)
    const [name, setName] = useState("")
    const [film, setFilm] = useState("")

    const { createdProducts } = useAppSelector((state) => state.products)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (choosenProduct) {
            setName(choosenProduct.name)
            setFilm(choosenProduct.films[0] || "")
        } else {
            setName("")
            setFilm("")
        }
    }, [choosenProduct])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!choosenProduct || !name || !film) return

        const updatedProduct: Product = {
            ...choosenProduct,
            name,
            films: [film],
        }

        dispatch(updateProduct(updatedProduct))

        setChoosenProduct(null)
    }

    return (
        <div className="pt-10 px-5">
            <div className="flex items-center flex-wrap gap-10">
                <Title>Edit Product</Title>
                <Link href={"/"}>
                    <Button>Return to home</Button>
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-10">
                {createdProducts.map((p) => (
                    <div
                        key={p._id}
                        onClick={() => setChoosenProduct(p)}
                        className={choosenProduct?._id === p._id ? "ring-2 ring-blue-500 rounded-lg" : ""}
                    >
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>

            {choosenProduct && (
                <form className="flex flex-col gap-5 mt-10 text-black max-w-max" onSubmit={handleSubmit}>
                    <Input name="name" value={name} handleChange={(e) => setName(e.target.value)} placeholder="Name" />
                    <Input name="film" value={film} handleChange={(e) => setFilm(e.target.value)} placeholder="Film" />
                    <div className="flex gap-3">
                        <Button type="submit">Update</Button>
                        <Button type="button" onClick={() => setChoosenProduct(null)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}
