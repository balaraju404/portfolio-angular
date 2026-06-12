export interface SaveResponse {
 status: boolean;
 msg: string;
 id?: string;
}

export interface UpdateResponse {
 status: boolean;
 msg: string;
}

export interface DetailsResponse<T> {
 status: boolean;
 data: T[];
}

export interface PagingResponse<T> {
 status: boolean;
 data: T[];
 count: number;
}