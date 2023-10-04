import { NextRequest, NextResponse } from "next/server";

export function curentUrl(path: any) {
  if (path === "/maintenance") {
    return true;
  }
}

export async function middleware(req: NextRequest) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/common-settings`,
    {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "*",
        userapisecret: `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
      },
    }
  );
  const data = await res.json();  
  if (parseInt(data?.data?.maintenance_mode_status) === 1) {
    if (curentUrl(req.nextUrl.pathname) === true) {
      return NextResponse.next();
    }
    // return NextResponse.redirect(
    //   `${process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL}maintenance`
    // );
    return NextResponse.redirect(new URL("/maintenance", req.url));
    // return NextResponse.rewrite(new URL("/maintenance", req.url));
  }
  // return NextResponse.rewrite(req.nextUrl);
}

export const config = {
  matcher: [
    "/",
    "/:path*",
    "/dashboard/:path*",
    "/user/:path*",
    "/exchange/:path*",
    "/user/my-wallet/:path*",
  ],
};
 