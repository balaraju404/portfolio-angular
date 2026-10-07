import { environment } from "../../../environments/environment"

const API_URL = environment.apiUrl

export const API_ENDPOINTS = {
 AUTH: {
  LOGIN: `${API_URL}auth/login`,
  REGISTER: `${API_URL}auth/register`
 },
 SECTION: {
  CREATE: "/section",
  UPDATE: (id: string) => `/section/${id}`,
  DELETE: (id: string) => `/section/${id}`,
  TOGGLE: (id: string) => `/section/${id}/toggle`,
  GET_BY_ID: (id: string) => `/section/${id}`,
  PAGING: "/section/paging",
  ALL: "/section/all"
 }
} as const