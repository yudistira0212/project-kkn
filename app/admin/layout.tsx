"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { checkUser } from "../lib/firebase/services";
import { User } from "firebase/auth";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [email, setEmail] = useState<string | null>("");
  const [userName, setUserName] = useState<string | null>("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    console.log("Tampilkan profil");
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    chechUser();
  }, []);

  const chechUser = async () => {
    await checkUser((success: boolean, user: User) => {
      if (success) {
        // console.log(message);
        setEmail(user.email);
        setUserName(user.displayName);
      }
    });
    // console.log(user);
  };

  return (
    <div>
      <div className="flex flex-col h-screen">
        <nav className="bg-slate-600 h-16 flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
          <div className="flex items-center gap-4">
            <div>
              <Link href="/">
                <p className="text-white font-bold text-lg">Logo</p>
              </Link>
            </div>
            <div className="hidden md:flex gap-6">
              <Link href="#">
                <p className="text-white hover:text-gray-300">Tentang</p>
              </Link>
              <Link href="#">
                <p className="text-white hover:text-gray-300">Layanan</p>
              </Link>
              <Link href="#">
                <p className="text-white hover:text-gray-300">Kontak</p>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center">
              <div className="mr-3 flex items-center justify-center gap-2">
                <h4>{userName}</h4>
                <Image
                  src="/app/images/gaul.jpg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                  <div className=" py-3 text-center">
                    <h4>{email}</h4>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Lihat Profil
                  </button>
                  <button
                    // onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <button onClick={handleSidebarToggle} className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.293 5.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>

        <div className="flex h-full">
          <nav
            className={`flex flex-col border w-[300px] ${
              isSidebarOpen ? "translate-x-0" : "hidden"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <h2 className="text-xl font-semibold">Menu</h2>
            </div>
            <div className="flex flex-col gap-2 ">
              <Link href="/admin/profil">
                <p className="block py-3 ps-4  text-gray-800 hover:text-gray-100 hover:bg-gray-500 rounded-sm">
                  Profil Desa
                </p>
              </Link>
              <Link href="/admin/potensi">
                <p className="block py-3 ps-4 text-gray-800 hover:text-gray-100 hover:bg-gray-500 rounded-sm">
                  Potensi Kampung
                </p>
              </Link>
              <Link href="/admin/data-penduduk">
                <p className="block py-3 ps-4 text-gray-800 hover:text-gray-100 hover:bg-gray-500 rounded-sm">
                  Data Penduduk
                </p>
              </Link>
              <Link href="/admin/galeri">
                <p className="block py-3 ps-4 text-gray-800 hover:text-gray-100 hover:bg-gray-500 rounded-sm">
                  Galeri
                </p>
              </Link>
              <Link href="/admin/struktur">
                <p className="block py-3 ps-4 text-gray-800 hover:text-gray-100 hover:bg-gray-500 rounded-sm">
                  Struktur Organisasi
                </p>
              </Link>
              <Link href="/admin/kontak">
                <p className="block py-3 ps-4 text-gray-800 hover:text-gray-100 hover:bg-gray-500 rounded-sm">
                  kontak
                </p>
              </Link>
            </div>
          </nav>
          <div className="flex-1 m-1 border">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
