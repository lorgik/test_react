interface TitleProps {
    children: React.ReactNode
}

const Title = ({ children }: TitleProps) => {
    return <h2 className="inline-block max-w-max">{children}</h2>
}

export default Title
