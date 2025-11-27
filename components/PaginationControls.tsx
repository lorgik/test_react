import Button from "@/ui/Button"

interface PaginationControlsProps {
    currentPage: number
    totalPages: number
    isFetching?: boolean
    onPageChange: (newPage: number) => void
}

export default function PaginationControls({
    currentPage,
    totalPages,
    isFetching = false,
    onPageChange,
}: PaginationControlsProps) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const isPreviousDisabled = currentPage <= 1 || isFetching
    const isNextDisabled = currentPage >= totalPages || isFetching

    if (totalPages <= 1) return null

    return (
        <div className="grid grid-cols-3 gap-4 mt-10 min-w-max mx-auto">
            <Button onClick={handlePrevious} disabled={isPreviousDisabled}>
                Previous
            </Button>
            <span className="self-center text-center text-[18px] font-medium bg-[var(--background)] px-6 py-3 rounded-xl">
                {currentPage} / {totalPages}
            </span>
            <Button onClick={handleNext} disabled={isNextDisabled}>
                Next
            </Button>
        </div>
    )
}
