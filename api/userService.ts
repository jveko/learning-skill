import { get } from "http"

const baseUrl = "user"

export interface RegisterResponse {
  name: string
  email: string
  updated_at: string
  created_at: string
  id: number
}

export async function register(userInfo: {
  name: string
  email: string
  password: string
}): Promise<RegisterResponse> {
  const { name, email, password } = userInfo
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${baseUrl}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    },
  )
  return await response.json()
}

export interface LoginResponse {
  token: string
}
export async function login(userInfo: {
  email: string
  password: string
}): Promise<LoginResponse> {
  const { email, password } = userInfo

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${baseUrl}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  )
  if (response.status !== 200) throw new Error("Username or password is wrong")
  return await response.json()
}

export interface MeResponse {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  isAdmin: boolean
}

export async function me(token: string): Promise<MeResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${baseUrl}/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    },
  )
  if (response.status !== 200) throw new Error("Token is invalid")
  return await response.json()
}

export async function getUsers(): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${baseUrl}`,
  )
  return await response.json()
}

export async function getClasses(token: string): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${baseUrl}/kelas`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    },
  )
  if (response.status !== 200) throw new Error("Token is invalid")
  return await response.json()
}

export const UserService = {
  register,
  login,
  getUsers,
  me,
  getClasses,
}
