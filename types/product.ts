export interface ProductsApiResponse {
    info: PaginationInfo
    data: FetchedProduct[]
}

export interface ProductApiResponse {
    info: PaginationInfo
    data: FetchedProduct
}

export interface PaginationInfo {
    count: number
    totalPages: number
    previousPage: string | null
    nextPage: string | null
}

export interface FetchedProduct {
    _id: number
    films: string[]
    shortFilms: string[]
    tvShows: string[]
    videoGames: string[]
    parkAttractions: string[]
    allies: string[]
    enemies: string[]
    name: string
    imageUrl: string
    url: string
}

export interface Product extends FetchedProduct {
    isFavourite: boolean
}
