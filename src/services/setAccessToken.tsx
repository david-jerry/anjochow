"use server"

import { cookies } from 'next/headers';
import React from 'react'

export default async function SetAuthAccessToken(token: string | null = null, refToken: string | null = null, userId: string | null = null) {
    if (token !== null) {
        cookies().set('authAccessToken', token!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hour (60 sec * 60 mins)
            path: "/"
        });
    }

    if (refToken !== null) {
        cookies().set('authRefreshToken', refToken!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 1, // 7 days (60 sec * 60 mins * 24 hours * 7 days)
            path: "/"
        });
    }

    if (userId !== null) {
        cookies().set('authUserId', userId!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 1, // 7 days (60 sec * 60 mins * 24 hours * 7 days)
            path: "/"
        });
    }


    return null;
}
