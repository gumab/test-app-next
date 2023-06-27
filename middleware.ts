import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
    const {nextUrl} = request;
    const {pathname} = nextUrl;

    if (pathname === '/.well-known/apple-app-site-association') {
        nextUrl.pathname = nextUrl.pathname + '.json'
        return NextResponse.rewrite(nextUrl);
    }
}
