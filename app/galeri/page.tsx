"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

import Gambar2 from "../images/GAMBAR 2.jpg";
import Gambar3 from "../images/GAMBAR 3.jpg";
import Image1 from "../images/Rectangle 3.png";
import Image2 from "../images/Rectangle 6.png";
import Image3 from "../images/Rectangle 8.png";
import Image4 from "../images/Rectangle 9.png";
import Image5 from "../images/Rectangle 10.png";

import Masonry from "react-masonry-css";

const navigation = [
  { name: "Beranda", href: "" },
  { name: "Potensi Kampung", href: "potensi" },
  { name: "Data Penduduk", href: "data-penduduk" },
  { name: "Galeri", href: "galeri" },
  { name: "Struktur Pemerintahan ", href: "struktur-organisasi" },
];

const galeri = [
  { id: "1", image: Image1, title: "Makan", details: "Nasi" },
  { id: "2", image: Image2, title: "Makan", details: "Nasi" },
  { id: "3", image: Image3, title: "Makan", details: "Nasi" },
  { id: "7", image: Image2, title: "Makan", details: "Nasi" },
  { id: "5", image: Image5, title: "Makan", details: "Nasi" },
  { id: "6", image: Image1, title: "Makan", details: "Nasi" },
  { id: "4", image: Image4, title: "Makan", details: "Nasi" },
  { id: "11", image: Image1, title: "Makan", details: "Nasi" },
  { id: "8", image: Image3, title: "Makan", details: "Nasi" },
  { id: "9", image: Image4, title: "Makan", details: "Nasi" },
  { id: "10", image: Image5, title: "Makan", details: "Nasi" },
  { id: "12", image: Image2, title: "Makan", details: "Nasi" },
  { id: "15", image: Image5, title: "Makan", details: "Nasi" },
  { id: "13", image: Image3, title: "Makan", details: "Nasi" },
  { id: "14", image: Image4, title: "Makan", details: "Nasi" },
];

function Galeri() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const breakpointColumns = {
    default: 6, // Number of columns by default
    1100: 5, // Number of columns on larger screens
    700: 3, // Number of columns on medium screens
    500: 1, // Number of columns on small screens
  };

  return (
    <div className="bg-[#0B3147]">
      <header className="absolute inset-x-0 top-0 z-50 bg-[#0B3147]">
        <nav
          className="flex items-center justify-end p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" color="white" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${item.href}`}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="pt-[100px] px-6">
        <h1 className="text-[30px] underlined-berita text-white">
          <strong>GALERI</strong>
        </h1>
        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="mt-[100px] my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {galeri.map((data) => (
            <div key={data.id} className="mb-6 relative group">
              <Image src={data.image} alt="" className="rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity rounded-lg">
                <div className="text-white text-center">
                  <p className="text-lg font-semibold">{data.title}</p>
                  <p className="text-white">{data.details}</p>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
      <footer className="md:flex  py-[30px] items-center px-8 mt-4 bg-[#0B3147] text-white">
        <div className="w-full md:w-2/3 ">
          <h1 className=" font-semibold">Kampung Siwi</h1>
          Jl. Raya Beji No. 13 Desa Beji Kec. Banjarmangu Kode Pos 53452
          <br />
          Kecamatan Banjarmangu Kabupaten Banjarnegara Provinsi Jawa Tengah Kode
          Pos 53452 <br />
          Email: Pemdesbejibjm@gmail.com Telp: 081226764534
        </div>
        <div className="md:w-1/3 w-full py-3 ">
          <div className="flex md:justify-end items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
              />
            </svg>
            Kampung Siwi
          </div>
          <div className="flex md:justify-end  items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
              />
            </svg>
            Kampung Siwi
          </div>
          <div className="flex md:justify-end items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4a20.26 20.26 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2"
              />
            </svg>
            Kampung Siwi
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Galeri;
