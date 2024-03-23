"use server"

import { cookies } from "next/headers"

export default async function DeleteAuthAccessToken(): Promise<(void)> {
    cookies().delete('authAccessToken');
    cookies().delete('authRefreshToken');
    return;
}
