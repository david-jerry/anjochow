"use server"

import { cookies } from "next/headers"

export default async function GetAuthAccessToken(): Promise<(string | undefined)[]> {
    const accessToken: string | undefined = cookies().get('authAccessToken')?.value;
    const refreshToken: string | undefined = cookies().get('authRefreshToken')?.value;
    return [accessToken, refreshToken]
}
