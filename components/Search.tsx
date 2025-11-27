import { useState } from "react"
import Input from "@/ui/Input"

interface SearchProps {
    onSearch: (value: string) => void
}

const Search = ({ onSearch }: SearchProps) => {
    const [value, setValue] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setValue(val)
        onSearch(val)
    }

    return <Input name="search" value={value} handleChange={handleChange} placeholder="Search" />
}

export default Search
