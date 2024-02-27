import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Sidebar = () => {
  const router = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-200 h-[89vh] p-2">
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className=" hover:bg-gray-500 hover:text-white  font-bold py-2 px-4 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}
      {isOpen && (
        <div className="  w-64">
          <div className="flex justify-between items-center">
            <h2 className="text-xl ps-4 font-semibold">Menu</h2>
            <button
              onClick={toggleSidebar}
              className=" hover:bg-gray-500 hover:text-white  font-bold py-2 px-4 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          </div>
          <nav
            className={`flex flex-col border ${
              isOpen ? "translate-x-0" : "hidden"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex flex-col gap-2 ">
              <Link href="/admin/profil">
                <p
                  className={`block py-3 ps-4 text-gray-800 rounded-sm ${
                    router === "/admin/profil"
                      ? "bg-gray-500 text-white"
                      : "hover:text-gray-100 hover:bg-gray-500"
                  }`}
                >
                  Profil Desa
                </p>
              </Link>
              <Link href="/admin/potensi">
                <p
                  className={`block py-3 ps-4 text-gray-800 rounded-sm ${
                    router === "/admin/potensi"
                      ? "bg-gray-500 text-white"
                      : "hover:text-gray-100 hover:bg-gray-500"
                  }`}
                >
                  Potensi Kampung
                </p>
              </Link>
              <Link href="/admin/data-penduduk">
                <p
                  className={`block py-3 ps-4 text-gray-800 rounded-sm ${
                    router === "/admin/data-penduduk"
                      ? "bg-gray-500 text-white"
                      : "hover:text-gray-100 hover:bg-gray-500"
                  }`}
                >
                  Data Penduduk
                </p>
              </Link>
              <Link href="/admin/galeri">
                <p
                  className={`block py-3 ps-4 text-gray-800 rounded-sm ${
                    router === "/admin/galeri"
                      ? "bg-gray-500 text-white"
                      : "hover:text-gray-100 hover:bg-gray-500"
                  }`}
                >
                  Galeri
                </p>
              </Link>
              <Link href="/admin/struktur">
                <p
                  className={`block py-3 ps-4 text-gray-800 rounded-sm ${
                    router === "/admin/struktur"
                      ? "bg-gray-500 text-white"
                      : "hover:text-gray-100 hover:bg-gray-500"
                  }`}
                >
                  Struktur Organisasi
                </p>
              </Link>
              <Link href="/admin/kontak">
                <p
                  className={`block py-3 ps-4 text-gray-800 rounded-sm ${
                    router === "/admin/kontak"
                      ? "bg-gray-500 text-white"
                      : "hover:text-gray-100 hover:bg-gray-500"
                  }`}
                >
                  kontak
                </p>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
