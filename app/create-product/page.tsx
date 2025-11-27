"use client"

import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { addProduct } from "@/store/productSlice"
import { Product } from "@/types/product"
import Link from "next/link"
import Title from "@/ui/Title"
import Button from "@/ui/Button"
import Input from "@/ui/Input"
import FlexRow from "@/ui/FlexRow"

export default function CreateProductPage() {
    const [name, setName] = useState("")
    const [film, setFilm] = useState("")

    const dispatch = useAppDispatch()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!name || !film) return

        const newProduct: Product = {
            _id: Date.now(),
            name,
            films: [film],
            shortFilms: [],
            tvShows: [],
            videoGames: [],
            parkAttractions: [],
            allies: [],
            enemies: [],
            imageUrl: "",
            url: "",
            isFavourite: false,
        }

        dispatch(addProduct(newProduct))

        setName("")
        setFilm("")
    }

    return (
        <>
            <FlexRow>
                <Title>Create product form</Title>
                <Link href={"/"}>
                    <Button>Return to home</Button>
                </Link>
            </FlexRow>

            <form className="flex flex-col gap-5 mt-10 text-black max-w-max" onSubmit={handleSubmit}>
                <Input name="name" value={name} placeholder="Name" handleChange={(e) => setName(e.target.value)} />
                <Input name="film" value={film} placeholder="Film" handleChange={(e) => setFilm(e.target.value)} />
                <Button type="submit">Create</Button>
            </form>
        </>
    )
}
