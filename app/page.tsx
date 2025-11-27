import Link from "next/link"
import Button from "@/ui/Button"
import Title from "@/ui/Title"
import FlexRow from "@/ui/FlexRow"

export default function HomePage() {
    return (
        <FlexRow>
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
        </FlexRow>
    )
}
