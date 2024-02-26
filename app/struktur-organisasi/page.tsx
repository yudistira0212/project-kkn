"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Image6 from "../images/Lambang_Kabupaten_Manokwari_Selatan.png";
import ReactFlow, { Controls } from "reactflow";

import "reactflow/dist/style.css";

const edges = [
  { id: "1-2", source: "1", target: "2", type: "step" },
  { id: "1-3", source: "1", target: "3", type: "step" },
  { id: "1-4", source: "1", target: "4", type: "step" },
  { id: "1-5", source: "1", target: "5", type: "step" },
  { id: "1-6", source: "1", target: "6", type: "step" },
  { id: "1-7", source: "1", target: "7", type: "step" },
  { id: "1-8", source: "1", target: "8", type: "step" },
  { id: "1-9", source: "1", target: "9", type: "step" },
  { id: "1-10", source: "1", target: "10", type: "step" },
  { id: "1-11", source: "1", target: "11", type: "step" },
  { id: "2-12", source: "2", target: "12", type: "step" },
  { id: "2-13", source: "2", target: "13", type: "step" },
  { id: "2-14", source: "2", target: "14", type: "step" },
];

const nodes = [
  {
    id: "1",
    data: { label: "Kepala Kampung \n DEREK L. AINUSI, S.H " },
    position: { x: 700, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "Sekretaris \n YOEL TRIRBO" },
    position: { x: 900, y: 105 },
  },
  {
    id: "3",
    data: { label: "KASI PEMERINTAHAN \n AMOS AINUSI " },
    position: { x: 500, y: 150 },
  },
  {
    id: "4",
    data: { label: "KASI KESEJAHTERAAN \n YOEL TRIRBO" },
    position: { x: 300, y: 150 },
  },
  {
    id: "5",
    data: { label: "KASI PELAYAN \n SARMAN TRIRBO" },
    position: { x: 100, y: 150 },
  },
  {
    id: "6",
    data: { label: "DUSUN SIBEJ \n ULIS AINUSI" },
    position: { x: 100, y: 550 },
  },
  {
    id: "7",
    data: { label: "DUSUN BEYANGAU \n MESAK MANDACAN" },
    position: { x: 300, y: 550 },
  },
  {
    id: "8",
    data: { label: "DUSUN LOHOY \n BOMAN TRIRBO" },
    position: { x: 500, y: 550 },
  },
  {
    id: "9",
    data: { label: "DUSUN SIWI MER \n YOKAB TRIRBO" },
    position: { x: 700, y: 550 },
  },
  {
    id: "10",
    data: { label: "DUSUN SAUGEMES \n ALFONS TRIRBO" },
    position: { x: 900, y: 550 },
  },
  {
    id: "11",
    data: { label: "SIWI GUNUNG \n LEVINUS IBA" },
    position: { x: 1100, y: 550 },
  },
  {
    id: "12",
    data: { label: "KAUR TU & UMUM \n LEWI AINUSI, S.E " },
    position: { x: 800, y: 210 },
  },
  {
    id: "13",
    data: { label: "KAUR KEUANGAN \n YOHANES TRIRBO, S.H " },
    position: { x: 970, y: 210 },
  },
  {
    id: "14",
    data: { label: "KAUR PERENCANAAN \n KELIOPAS TRIRBO " },
    position: { x: 1150, y: 210 },
  },
];

const navigation = [
  { name: "Beranda", href: "" },
  { name: "Potensi Kampung", href: "potensi" },
  { name: "Data Penduduk", href: "data-penduduk" },
  { name: "Galeri", href: "galeri" },
  { name: "Struktur Pemerintahan ", href: "struktur-organisasi" },
];

function StrukturOrganisasi() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div>
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
                      href={`/${item.href}`}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="mt-[100px] px-6 text-center">
        <h1 className="text-[30px] underlined-text">
          <strong>Struktur Organisasi </strong>
        </h1>
        <div className="flex flex-col items-center pt-5">
          <div className="px-4 flex flex-col items-center">
            <div className="bg-[#0B3147] rounded-xl mt-2 w-[200px] h-[50px] flex items-center justify-center">
              <p className="text-white  ">VISI</p>
            </div>
            <p className=" text-center px-3 mt-2 font-semibold">
              “MEWUJUDKAN KAMPUNG SIWI YANG BERLANDASAN IMAN, BERMARTABAT,
              SEJATERAH DAN TRANSPARAN”
            </p>
          </div>
          <div className="px-4 max-md:mt-6 flex flex-col items-center">
            <div className="bg-[#0B3147] rounded-xl mt-2 w-[200px] h-[50px] flex items-center justify-center">
              <p className="text-white  ">MISI</p>
            </div>
            <ol className=" px-3 mt-2 font-semibold">
              <li>
                MEWUJUDKAN MASYARAKAT KAMPUNG SIWI BERLANDASKAN KEIMANAN DAN
                SOSIAL BUDAYA.
              </li>
              <li>
                MENCIPTAKAN PEMERINTAHAN KAMPUNG SIWI YANG BERSIH DAN
                BERINTEGRASI.
              </li>
              <li>
                MENINGKATKAN KUALITAS HIDUP YANG MEMADAI DAN MEMILIKI DAYA
                SAING.
              </li>
              <li>
                MENINGKATKAN SUMBER DAYA MANUSIA (SDM), SUMBER DAYA ALAM (SDA),
                DAN SUMBER DAYA LAINNYA.
              </li>
              <li>
                MENINGKATKAN SARANA DAN PRASARANA BAGI MASYARAKAT KAMPUNG SIWI
                DI SEGALA BIDANG.
              </li>
            </ol>
          </div>
        </div>
        <div className="w-full h-[510px] px-3 mb-5 mt-5">
          <ReactFlow
            fitView
            nodes={nodes}
            edges={edges}
            className="border-4 border-[#0B3147]"
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
      <footer className="md:flex  py-[30px] items-center px-8 mt-4 bg-[#0B3147] text-white">
        {" "}
        <div className="w-full md:w-2/3 ">
          <h1 className=" font-semibold">Kampung Siwi</h1>
          <p>
            Kecamatan Momi Waren, Kabupaten Manokwari Selatan 98322
            <br />
            Email: Pemdesbejibjm@gmail.com Telp: 081226764534
          </p>
          <Image src={Image6} alt="" className="w-[80px] mt-2" />
        </div>
        <div className="md:w-1/3 w-full py-3 ">
          <h1 className="flex md:justify-end items-center font-semibold">
            Sosial Media
          </h1>
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

export default StrukturOrganisasi;
