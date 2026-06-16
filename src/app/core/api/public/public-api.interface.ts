/**
 * API request/response shapes for public endpoints.
 */

export interface DashboardResponse {
 status: boolean;
 data: DashboardData;
}
export interface DashboardData {
 portfolios_created: number;
 portfolio_sections: number;
 portfolio_templates: number;
}