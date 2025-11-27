interface ButtonProps {
    children: React.ReactNode
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    onClick?: () => void
}

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className="bg-blue-500 disabled:bg-blue-300 text-white px-5 py-3 font-medium text-lg rounded-xl cursor-pointer disabled:cursor-not-allowed hover:bg-blue-600 transition"
        >
            {children}
        </button>
    )
}

export default Button
