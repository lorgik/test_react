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
            className="bg-blue-500 disabled:bg-blue-300 text-white px-5 py-3 font-medium text-lg rounded-lg cursor-pointer disabled:cursor-not-allowed"
        >
            {children}
        </button>
    )
}

export default Button
