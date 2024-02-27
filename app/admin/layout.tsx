"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { checkUser } from "../lib/firebase/services";
import { User } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import Navbar from "../components/admin/Navbar/Navbar";
import { useSession } from "next-auth/react";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { push } = useRouter();
  const session = useSession();

  console.log(session);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      push("/login");
    }
  }, [session]);

  console.log({ session });

  return (
    <div>
      <div className="flex flex-col h-screen">
        <div className="sticky z-10 top-0 left-0 w-full">
          <Navbar />
        </div>

        <div className="flex overflow-hidden ">
          <div className="sticky ">
            <Sidebar />
          </div>

          <div className="flex-1 w-full overflow-y-auto    p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
