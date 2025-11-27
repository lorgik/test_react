type ButtonColor = "blue" | "green" | "red"
type ButtonType = "button" | "submit" | "reset"

interface ButtonProps {
    children: React.ReactNode
    color?: ButtonColor
    type?: ButtonType
    disabled?: boolean
    onClick?: () => void
}

const buttonColorClasses: Record<ButtonColor, string> = {
    blue: "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300",
    green: "bg-green-500 hover:bg-green-600 disabled:bg-green-300",
    red: "bg-red-500 hover:bg-red-600 disabled:bg-red-300",
}

const Button = ({ children, color = "blue", disabled = false, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`text-white px-5 py-3 font-medium text-lg rounded-xl cursor-pointer disabled:cursor-not-allowed transition ${buttonColorClasses[color]}`}
        >
            {children}
        </button>
    )
}

export default Button
