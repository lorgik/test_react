interface IconDeleteProps {
    className?: string
    size?: number
}

const IconDelete = ({ className = "", size = 24 }: IconDeleteProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M20 4L4 20M4 4l16 16" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

export default IconDelete
