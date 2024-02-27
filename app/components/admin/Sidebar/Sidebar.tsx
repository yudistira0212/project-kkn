"use client";
import { Dialog, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Home = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    </>
  );
};

const Potensi = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};
const Penduduk = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};
const Galeri = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};
const Struktur = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
    </svg>
  );
};

const LogOut = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Sidebar = () => {
  const router = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#0B3147] shadow-md h-[89vh] p-1">
      {!isOpen && (
        <>
          <button
            onClick={toggleSidebar}
            className=" hover:bg-[#1e5f85]  text-white font-bold py-2 px-4 rounded"
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
          <div className="flex flex-col gap-2 ">
            <Link
              href="/admin/profil"
              className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                router === "/admin/profil"
                  ? "bg-[#1e5f85] text-white"
                  : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
              }`}
            >
              <Home />
            </Link>
            <Link
              href="/admin/potensi"
              className={`flex gap-2 py-3  ps-4 text-gray-800 rounded-sm ${
                router === "/admin/potensi"
                  ? "bg-[#1e5f85] text-white"
                  : "hover:text-gray-100 text-white  hover:bg-[#1e5f85]"
              }`}
            >
              <Potensi />
            </Link>
            <Link
              href="/admin/data-penduduk"
              className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                router === "/admin/data-penduduk"
                  ? "bg-[#1e5f85] text-white"
                  : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
              }`}
            >
              <Penduduk />
            </Link>
            <Link
              href="/admin/galeri"
              className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                router === "/admin/galeri"
                  ? "bg-[#1e5f85] text-white"
                  : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
              }`}
            >
              <Galeri />
            </Link>
            <Link
              href="/admin/struktur"
              className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                router === "/admin/struktur"
                  ? "bg-[#1e5f85] text-white"
                  : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
              }`}
            >
              <Struktur />
            </Link>
            <button
              onClick={() => signOut()}
              className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                router === "/admin/kontak"
                  ? "bg-[#1e5f85] text-white"
                  : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
              }`}
            >
              <LogOut />
            </button>
          </div>
        </>
      )}
      {isOpen && (
        // <Transition appear show={isOpen} as={React.Fragment}>
        //   <Transition.Child
        //     as={React.Fragment}
        //     enter="ease-out duration-300"
        //     enterFrom="opacity-0 -translate-x-full"
        //     enterTo="opacity-100 translate-x-0"
        //     leave="ease-in duration-200"
        //     leaveFrom="opacity-100 translate-x-0"
        //     leaveTo="opacity-0 -translate-x-full"
        //   >
        <div className="  w-64 transition duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-white ps-4 font-semibold">Menu</h2>
            <button
              onClick={toggleSidebar}
              className=" hover:bg-[#1e5f85] text-white  font-bold py-2 px-4 rounded"
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
            className={`flex flex-col ${
              isOpen ? "translate-x-0" : "hidden"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex flex-col gap-2 ">
              <Link
                href="/admin/profil"
                className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                  router === "/admin/profil"
                    ? "bg-[#1e5f85] text-white"
                    : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
                }`}
              >
                <Home />
                <p>Profil Desa</p>
              </Link>
              <Link
                href="/admin/potensi"
                className={`flex gap-2 py-3  ps-4 text-gray-800 rounded-sm ${
                  router === "/admin/potensi"
                    ? "bg-[#1e5f85] text-white"
                    : "hover:text-gray-100 text-white  hover:bg-[#1e5f85]"
                }`}
              >
                <Potensi />
                <p>Potensi Kampung</p>
              </Link>
              <Link
                href="/admin/data-penduduk"
                className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                  router === "/admin/data-penduduk"
                    ? "bg-[#1e5f85] text-white"
                    : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
                }`}
              >
                <Penduduk />
                <p>Data Penduduk</p>
              </Link>
              <Link
                href="/admin/galeri"
                className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                  router === "/admin/galeri"
                    ? "bg-[#1e5f85] text-white"
                    : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
                }`}
              >
                <Galeri />
                <p>Galeri</p>
              </Link>
              <Link
                href="/admin/struktur"
                className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                  router === "/admin/struktur"
                    ? "bg-[#1e5f85] text-white"
                    : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
                }`}
              >
                <Struktur />
                <p>Struktur Organisasi</p>
              </Link>
              <button
                onClick={() => signOut()}
                className={`flex gap-2 py-3 ps-4 text-gray-800 rounded-sm ${
                  router === "/admin/kontak"
                    ? "bg-[#1e5f85] text-white"
                    : "hover:text-gray-100 text-white hover:bg-[#1e5f85]"
                }`}
              >
                <LogOut />
                <p>logOut</p>
              </button>
            </div>
          </nav>
        </div>
        //   </Transition.Child>
        // </Transition>
      )}
    </div>
  );
};

export default Sidebar;
