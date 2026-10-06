import { environment } from "../../../environments/environment"

const API_URL = environment.apiUrl

export const API_ENDPOINTS = {
 AUTH: {
  LOGIN: `${API_URL}auth/login`,
  REGISTER: `${API_URL}auth/register`
 }
} as const