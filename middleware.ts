import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  if (pathname === '/.well-known/apple-app-site-association') {
    nextUrl.pathname = nextUrl.pathname + '.json';
    return NextResponse.rewrite(nextUrl);
  }

  if (/^\/(main|goods|categories|collections|test)/.test(pathname)) {
    nextUrl.search = '?org=' + encodeURIComponent(nextUrl.pathname);
    nextUrl.pathname = '/any';
    return NextResponse.rewrite(nextUrl);
  }

  if (/^\/gateway\/goods\//.test(pathname)) {
    const goodsCode = /^\/gateway\/goods\/(\w+)/.exec(pathname)[1];
    return NextResponse.redirect(`https://universal-link-test-beryl.vercel.app/goods/${goodsCode}`);
  }
}
