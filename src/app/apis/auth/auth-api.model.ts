/** LOGIN */
export interface LoginRequest {
 email: string;
 password: string;
}

export interface LoginData {
 user: User;
 token: string;
}

export interface User {
 _id: string;
 name: string;
 email: string;
 role: string;
 createdAt: string;
 updatedAt: string;
}

/** REGISTER */
export interface RegisterRequest {
 name: string;
 email: string;
 password: string;
 confirmPassword: string;
}

export interface RegisterData {
 _id: string;
 name: string;
 email: string;
 role: string;
 createdAt: string;
 updatedAt: string;
}