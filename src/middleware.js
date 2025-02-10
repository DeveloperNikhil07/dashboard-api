import { NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001','http://192.168.67.232:3000','https://newrenewabledashboard.netlify.app/']; // Add allowed origins

export function middleware(request) {
    const origin = request.headers.get('origin') ?? '';
    const isAllowedOrigin = allowedOrigins.includes(origin) || allowedOrigins.includes('*');

    const isPreflight = request.method === 'OPTIONS';

    if (isPreflight) {
        const preflightHeaders = {
            ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        };
        return NextResponse.json({}, { headers: preflightHeaders });
    }

    // Handle other requests
    const response = NextResponse.next();

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    return response;
}

export const config = {
    matcher: '/api/:path*', // Only apply middleware to API routes
};
