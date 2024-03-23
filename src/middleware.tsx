import { NextRequest, NextResponse } from "next/server";
import apiService from "./services/apiService";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    return response;
}