interface InputProps {
    name: string
    value: string
    placeholder?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ handleChange, ...props }: InputProps) => {
    return (
        <input
            type="text"
            className="bg-stone-100 px-4 py-3 rounded-xl"
            onChange={handleChange}
            required
            autoComplete="off"
            {...props}
        />
    )
}

export default Input
