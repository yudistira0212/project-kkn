import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "./app/lib/firebase/services";
import { getSession, useSession } from "next-auth/react";

export async function middleware(request: NextRequest) {
  // const pathname = request.nextUrl.pathname;
  // const session = await getSession();
  // // Cek apakah pathname memiliki awalan /admin
  // console.log({ session });
  // if (pathname.startsWith("/admin")) {
  //   console.log({ session });
  //   if (session === null) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   } else {
  //     return NextResponse.next();
  //   }
  // }
  // // Jika pathname tidak memiliki awalan /admin, beri akses
  // return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
