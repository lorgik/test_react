interface MediaListProps {
    title: string
    items: string[]
}

const MediaList = ({ title, items }: MediaListProps) => {
    if (!items.length) return null

    return (
        <div className="flex-1 min-w-[200px] sm:min-w-[150px]">
            <h3 className="font-bold">{title}</h3>
            <ul className="mt-2 flex flex-col gap-2">
                {items.map((item, i) => (
                    <li key={i} className="text-balance">
                        {i + 1}. {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MediaList
