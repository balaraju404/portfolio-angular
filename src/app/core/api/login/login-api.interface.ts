import { Observable } from "rxjs";

/** Login Check */
export interface LoginCheckRequest {
 login_name: string;
 password: string;
}
export interface LoginCheckResponse {
 status: boolean;
 msg: string;
 data: UserData
}
export interface UserData {
 user_id: string
 fname: string,
 lname: string,
 login_name: string,
 is_admin: number,
 created_at: string,
}


/** Login Signup */
export interface LoginSignupRequest {
 login_name: string;
 password: string;
}
export interface LoginSignupResponse {
 status: boolean;
 msg: string;
}

export interface LoginApiInterface {
 check(request: LoginCheckRequest): Observable<LoginCheckResponse>;
 signup(request: LoginSignupRequest): Observable<LoginSignupResponse>;
}