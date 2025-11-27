interface FlexRowProps {
    children: React.ReactNode
    className?: string
}

const FlexRow = ({ children, className = "" }: FlexRowProps) => {
    return <div className={`flex items-center flex-wrap gap-10 ${className}`}>{children}</div>
}

export default FlexRow
