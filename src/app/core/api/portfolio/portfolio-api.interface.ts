/**
 * API request/response shapes for portfolio endpoints.
 */

export interface PortfolioCreateRequest {
 user_id: string;
 portfolio_name: string;
 user_info: UserInfo;
 services?: Service[];
 projects?: Project[];
 contact_info?: ContactInfo;
}

// Core models
export interface UserInfo {
 name: string;
 role: string;
 about: string;
 img?: string;
}

export interface Service {
 id: number;
 title: string;
 description: string[];
}

export interface TechStack {
 id?: number;
 cat_name: string;
 skills: string[];
}

export interface Project {
 id: number;
 title: string;
 description: string;
 url?: string;
 tech_stack?: TechStack[];
}

export interface ContactInfo {
 mobile_no: string;
 alternative_number?: string;
 email: string;
 alternative_email?: string;
 address: string;
}

// Card/listing-specific models
export interface UserInfoCard {
 name: string;
 role: string;
 img?: string;
 about?: string;
}

export interface ContactInfoCard {
 address: string;
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

// API request/response shapes for list/details
export interface PortfolioListRequest {
 user_id?: string;
 portfolio_id?: string;
 portfolio_name?: string;
 is_private?: 0 | 1;
 status?: 0 | 1;
}

export interface PortfolioDetailsRequest {
 user_id?: string;
 portfolio_id?: string;
 portfolio_name?: string;
 is_private?: 0 | 1;
 status?: 0 | 1;
}

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