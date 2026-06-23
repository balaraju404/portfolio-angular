import { environment } from "../../environments/environment"

const API_URL: string = environment.apiUrl

/** LOGIN */
const LOGIN_ENDPOINT = `${API_URL}/login`
export const LOGIN_ENDPOINT_URLS = {
 check: `${LOGIN_ENDPOINT}/check`,
 signup: `${LOGIN_ENDPOINT}/signup`
}

/** PORTFOLIO */
const PORTFOLIO_ENDPOINT = `${API_URL}/portfolio`
export const PORTFOLIO_ENDPOINT_URLS = {
 create: `${PORTFOLIO_ENDPOINT}/create`,
 list: `${PORTFOLIO_ENDPOINT}/list`,
 details: `${PORTFOLIO_ENDPOINT}/details`
}

/** PUBLIC */
const PUBLIC_ENDPOINT = `${API_URL}/public`
export const PUBLIC_ENDPOINT_URLS = {
 dashboard: `${PUBLIC_ENDPOINT}/dashboard`
}