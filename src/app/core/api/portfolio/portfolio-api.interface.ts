import { Observable } from "rxjs";

/** Create */
export interface PortfolioCreateRequest { }
export interface PortfolioCreateResponse { }

/** Details */
export interface PortfolioListRequest {
 user_id?: string;
 portfolio_id?: string;
 portfolio_name?: string;
 is_private?: 0 | 1;
 status?: 0 | 1;
}
export interface PortfolioListResponse {
 status: boolean;
 data: PortfolioCardData[];
}
export interface PortfolioCardData {
 _id: string;
 portfolio_name: string;
 user_info: UserInfoCard;
 contact_info: ContactInfoCard;
 projects_count: number;
 services_count: number;
 skills: string[];
}
export interface UserInfoCard {
 name: string;
 role: string;
 img: string;
 about: string;
}
export interface ContactInfoCard {
 address: string;
}

/** Details */
export interface PortfolioDetailsRequest {
 user_id?: string;
 portfolio_id?: string;
 portfolio_name?: string;
 is_private?: 0 | 1;
 status?: 0 | 1;
}
export interface PortfolioDetailsResponse {
 status: boolean;
 data: PortfolioData[];
}

/** Portfolio Data */
export interface PortfolioData {
 _id: string;
 user_id: string;
 portfolio_name: string;
 is_private: number;
 status: number;
 created_at: string;

 user_info: UserInfo;
 services: Service[];
 projects: Project[];
 contact_info: ContactInfo;
}

/** User Info */
export interface UserInfo {
 name: string;
 role: string;
 about: string;
 img: string;
}

/** Services */
export interface Service {
 id: number;
 title: string;
 description: string[];
}

/** Projects */
export interface Project {
 id: number;
 title: string;
 description: string;
 url: string;
 teck_stack: TechStack[];
}

/** Tech Stack */
export interface TechStack {
 id: number;
 cat_name: string;
 skills: string[];
}

/** Contact Info */
export interface ContactInfo {
 mobile_no: string;
 email: string;
 address: string;
}

/** Service */
export interface PortfolioApiInterface {
 create(request: PortfolioCreateRequest): Observable<PortfolioCreateResponse>;
 list(request: PortfolioListRequest): Observable<PortfolioListResponse>;
 details(request: PortfolioDetailsRequest): Observable<PortfolioDetailsResponse>;
}