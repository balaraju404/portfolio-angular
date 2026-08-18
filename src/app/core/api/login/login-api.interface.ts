export interface LoginCheckRequest {
 login_name: string;
 password: string;
}

export interface UserData {
 user_id: string;
 fname: string;
 lname: string;
 login_name: string;
 is_admin: number;
 created_at: string;
}

export interface LoginCheckResponse {
 status: boolean;
 msg: string;
 data: UserData | null;
}

export interface LoginSignupRequest {
 login_name: string;
 password: string;
}

export interface LoginSignupResponse {
 status: boolean;
 msg: string;
}