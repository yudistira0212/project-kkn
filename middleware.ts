import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "./app/lib/firebase/services";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("masukkk");

  // Cek apakah pathname memiliki awalan /admin
  if (pathname.startsWith("/admin")) {
    const user = await checkUser();

    console.log({ user });

    if (user) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Jika pathname tidak memiliki awalan /admin, beri akses
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
