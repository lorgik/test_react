import Link from "next/link"
import Button from "@/ui/Button"
import Title from "@/ui/Title"

export default function HomePage() {
    return (
        <div className="flex items-center flex-wrap gap-10 pt-10 px-5">
            <Title>Home</Title>
            <div className="flex items-center flex-wrap gap-5">
                <Link href={"/products"}>
                    <Button>Open products</Button>
                </Link>
                <Link href={"/create-product"}>
                    <Button>Create product</Button>
                </Link>
                <Link href={"/edit-product"}>
                    <Button>Edit product</Button>
                </Link>
            </div>
        </div>
    )
}
