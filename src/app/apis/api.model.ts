export interface ApiResponse<T> {
 success: boolean
 message: string
 data: T
}

export interface ApiPagingResponse<T> extends ApiResponse<PagingData<T>> { }

export interface PagingData<T> {
 records: T[]
 pagination: PaginationData
}

export interface PaginationData {
 page: number
 limit: number
 total: number
 totalPages: number
 hasNextPage: boolean
 hasPreviousPage: boolean
}