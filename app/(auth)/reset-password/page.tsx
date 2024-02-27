"use client";
import { useState } from "react";
import { auth } from "@/app/lib/firebase/init";
import { sendPasswordResetEmail } from "firebase/auth";
import logo from "@/app/images/Lambang_Kabupaten_Manokwari_Selatan.png";
import Image from "next/image";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      alert("Reset Password Telah di kirim di Email anda");
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* <Link></Link> */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-50 w-auto"
            src={logo}
            alt="Your Company"
            height={80}
            width={80}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Lupa Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Alamat Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-2  bg-white/5 py-1.5  shadow-sm ring-2  ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => resetEmail()}
                disabled={!email}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Send Forgot Password Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
