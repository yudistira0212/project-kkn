import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { checkUser } from "./app/lib/firebase/services";
import { User } from "firebase/auth";

export const middleware = async (req: NextRequest) => {
  try {
    // let success = false;
    console.log("masukkkk");
    await checkUser((success: boolean, user: User) => {
      if (success) {
        console.log({ success });
      } else {
        return NextResponse.redirect(new URL("/login/", req.url));
      }
    });
    // if (!success) {
    //   return NextResponse.redirect(new URL("/login/", req.url));
    // }
  } catch (error: any) {
    console.error("Error checking user:", error.message);
    return NextResponse.json({ error: "Internal Server Error" });
  }
};

export const config = {
  matcher: ["/admin/:path*"],
};
