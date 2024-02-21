import { createUser } from "@/app/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const userData = await request.json();

  console.log(userData);

  await createUser(userData, (success: boolean, message: string) => {
    if (success) {
      return NextResponse.json({ success: true, message: message });
    } else {
      return NextResponse.json({ success: false, message: message });
    }
  });

  return NextResponse.json({
    success: false,
    message: "gagal melakukan register",
  });
};
