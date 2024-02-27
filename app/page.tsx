"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// import Image from "next/image";
// import panitia from "./images/gaul.jpg";

// import Gambar1 from "./images/GAMBAR 1.jpg";
// import Gambar2 from "./images/GAMBAR 2.jpg";
// import Gambar3 from "./images/GAMBAR 3.jpg";
// import Gambar4 from "./images/GAMBAR 4.jpg";
// import Gambar5 from "./images/GAMBAR 5.jpg";
// import Gambar6 from "./images/GAMBAR 6.jpg";
// import ReactFlow, { Controls } from "reactflow";
import "reactflow/dist/style.css";
// import Image6 from "./images/Lambang_Kabupaten_Manokwari_Selatan.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfilKampung from "./components/profilKampung/ProfilKampung";
import PotensiKampung from "./components/beranda/PotensiKampung";
import DataPenduduk from "./components/beranda/DataPenduduk";
import StrukturOrganisasi from "./components/beranda/StrukturOrganisasi";
import Galeri from "./components/beranda/Galeri";
import Footer from "./components/footer/Footer";

const navigation = [
  { name: "Beranda", href: "" },
  { name: "Potensi Kampung", href: "potensi" },
  { name: "Data Penduduk", href: "data-penduduk" },
  { name: "Galeri", href: "galeri" },
  { name: "Struktur Pemerintahan ", href: "struktur-organisasi" },
  { name: "Login Admin ", href: "login" },
];

interface AccordionProps {
  data: {
    question: string;
    answer: string;
  }[];
}

// const dataPenduduk = [
//   {
//     id: "1",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="70"
//         height="70"
//         viewBox="0 0 48 48"
//       >
//         <g
//           fill="none"
//           stroke="currentColor"
//           stroke-linecap="round"
//           stroke-width="4"
//         >
//           <path d="M10 19s-5.143 2-6 9m34-9s5.143 2 6 9m-26-9s4.8 1.167 6 7m6-7s-4.8 1.167-6 7m-4 8s-4.2.75-6 6m14-6s4.2.75 6 6" />
//           <circle cx="24" cy="31" r="5" stroke-linejoin="round" />
//           <circle cx="34" cy="14" r="6" stroke-linejoin="round" />
//           <circle cx="14" cy="14" r="6" stroke-linejoin="round" />
//         </g>
//       </svg>
//     ),
//     title: "Jumlah Keluarga 2023",
//     content: "9999",
//   },
//   {
//     id: "2",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="70"
//         height="70"
//         viewBox="0 0 16 16"
//       >
//         <path
//           fill="currentColor"
//           d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6.004 6.004 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0M10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0"
//         />
//       </svg>
//     ),
//     title: "Jumlah Penduduk",
//     content: "9999",
//   },
//   {
//     id: "3",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="70"
//         height="70"
//         viewBox="0 0 1024 1024"
//       >
//         <path
//           fill="currentColor"
//           d="M874 120H622c-3.3 0-6 2.7-6 6v56c0 3.3 2.7 6 6 6h160.4L583.1 387.3c-50-38.5-111-59.3-175.1-59.3c-76.9 0-149.3 30-203.6 84.4S120 539.1 120 616s30 149.3 84.4 203.6C258.7 874 331.1 904 408 904s149.3-30 203.6-84.4C666 765.3 696 692.9 696 616c0-64.1-20.8-124.9-59.2-174.9L836 241.9V402c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V150c0-16.5-13.5-30-30-30M408 828c-116.9 0-212-95.1-212-212s95.1-212 212-212s212 95.1 212 212s-95.1 212-212 212"
//         />
//       </svg>
//     ),
//     title: "Jumlah Laki-laki",
//     content: "9999",
//   },
//   {
//     id: "4",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="70"
//         height="70"
//         viewBox="0 0 24 24"
//       >
//         <path
//           fill="currentColor"
//           fill-rule="evenodd"
//           d="M12 2.75a6.25 6.25 0 1 0 0 12.5a6.25 6.25 0 0 0 0-12.5M4.25 9a7.75 7.75 0 1 1 8.5 7.714v1.036h1.75a.75.75 0 0 1 0 1.5h-1.75V22a.75.75 0 1 1-1.5 0v-2.75H9.5a.75.75 0 0 1 0-1.5h1.75v-1.036A7.75 7.75 0 0 1 4.25 9"
//           clip-rule="evenodd"
//         />
//       </svg>
//     ),
//     title: "Jumlah Perempuan",
//     content: "9999",
//   },
// ];

// const data = [
//   {
//     question: "Apa itu webste Kampung Siwi?",
//     answer:
//       "Platform informasi daring yang menyajikan berbagai potensi dan peluang di Kampung Siwi, memberikan akses dan wawasan kepada pengguna untuk pengembangan ilmu dan profesionalisme.",
//   },
//   {
//     question: "Halaman apa saja yang dimiliki website Kampung Siwi?",
//     answer:
//       "Terdapat beberapa Halaman yang tersedia seperti Potensi Kampung, Data Penduduk, Struktur Organisasi, dan Galeri.",
//   },
//   {
//     question: "Mengapa harus menggunakan website Kampung Siwi?",
//     answer:
//       "Dengan menggunakan website Kampung Siwi kita bisa mengetahui lebih jauh terkait apa yang ada di Kampung Siwi seperti potensi, struktur, jumlah penduduk, dsb.",
//   },
// ];

// const edges = [
//   { id: "1-2", source: "1", target: "2", type: "step" },
//   { id: "1-3", source: "1", target: "3", type: "step" },
//   { id: "1-4", source: "1", target: "4", type: "step" },
//   { id: "1-5", source: "1", target: "5", type: "step" },
//   { id: "1-6", source: "1", target: "6", type: "step" },
//   { id: "1-7", source: "1", target: "7", type: "step" },
//   { id: "1-8", source: "1", target: "8", type: "step" },
//   { id: "1-9", source: "1", target: "9", type: "step" },
//   { id: "1-10", source: "1", target: "10", type: "step" },
//   { id: "1-11", source: "1", target: "11", type: "step" },
//   { id: "2-12", source: "2", target: "12", type: "step" },
//   { id: "2-13", source: "2", target: "13", type: "step" },
//   { id: "2-14", source: "2", target: "14", type: "step" },
// ];

// const nodes = [
//   {
//     id: "1",
//     data: { label: "Kepala Kampung \n DEREK L. AINUSI, S.H " },
//     position: { x: 700, y: 0 },
//     type: "input",
//   },
//   {
//     id: "2",
//     data: { label: "Sekretaris \n YOEL TRIRBO" },
//     position: { x: 900, y: 105 },
//   },
//   {
//     id: "3",
//     data: { label: "KASI PEMERINTAHAN \n AMOS AINUSI " },
//     position: { x: 500, y: 150 },
//   },
//   {
//     id: "4",
//     data: { label: "KASI KESEJAHTERAAN \n YOEL TRIRBO" },
//     position: { x: 300, y: 150 },
//   },
//   {
//     id: "5",
//     data: { label: "KASI PELAYAN \n SARMAN TRIRBO" },
//     position: { x: 100, y: 150 },
//   },
//   {
//     id: "6",
//     data: { label: "DUSUN SIBEJ \n ULIS AINUSI" },
//     position: { x: 100, y: 550 },
//   },
//   {
//     id: "7",
//     data: { label: "DUSUN BEYANGAU \n MESAK MANDACAN" },
//     position: { x: 300, y: 550 },
//   },
//   {
//     id: "8",
//     data: { label: "DUSUN LOHOY \n BOMAN TRIRBO" },
//     position: { x: 500, y: 550 },
//   },
//   {
//     id: "9",
//     data: { label: "DUSUN SIWI MER \n YOKAB TRIRBO" },
//     position: { x: 700, y: 550 },
//   },
//   {
//     id: "10",
//     data: { label: "DUSUN SAUGEMES \n ALFONS TRIRBO" },
//     position: { x: 900, y: 550 },
//   },
//   {
//     id: "11",
//     data: { label: "SIWI GUNUNG \n LEVINUS IBA" },
//     position: { x: 1100, y: 550 },
//   },
//   {
//     id: "12",
//     data: { label: "KAUR TU & UMUM \n LEWI AINUSI, S.E " },
//     position: { x: 800, y: 210 },
//   },
//   {
//     id: "13",
//     data: { label: "KAUR KEUANGAN \n YOHANES TRIRBO, S.H " },
//     position: { x: 970, y: 210 },
//   },
//   {
//     id: "14",
//     data: { label: "KAUR PERENCANAAN \n KELIOPAS TRIRBO " },
//     position: { x: 1150, y: 210 },
//   },
// ];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [isSmallScreen, setIsSmallScreen] = useState(false);
  // const [isSlideScreen, setIsSlideScreen] = useState(false);
  // const [isFooterScreen, setIsFooterScreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleClick = (index: number | null) => {
    setActiveIndex((prevIndex: number | null) =>
      prevIndex === index ? null : index
    );
  };

  // useEffect(() => {
  //   // Function to check the screen size and update state
  //   const handleResize = () => {
  //     setIsSmallScreen(window.innerWidth < 768);
  //   };

  //   // Initial check on mount
  //   handleResize();

  //   // Event listener for window resize
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // });

  //SLIDE State
  // useEffect(() => {
  //   // Function to check the screen size and update state
  //   const handleResizeSlide = () => {
  //     setIsSlideScreen(window.innerWidth < 385);
  //   };

  //   // Initial check on mount
  //   handleResizeSlide();

  //   // Event listener for window resize
  //   window.addEventListener("resize", handleResizeSlide);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResizeSlide);
  //   };
  // }, []);
  //Footer State
  // useEffect(() => {
  //   // Function to check the screen size and update state
  //   const handleResizeFooter = () => {
  //     setIsFooterScreen(window.innerWidth < 870);
  //   };

  // Initial check on mount
  //   handleResizeFooter();

  //   // Event listener for window resize
  //   window.addEventListener("resize", handleResizeFooter);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResizeFooter);
  //   };
  // });

  const Accordion: React.FC<AccordionProps> = ({ data }) => {
    return (
      <div className="w-full">
        {data.map((item: any, index: any) => (
          <div key={index} className="mb-2 w-auto">
            <div
              className="bg-[#002B34] bg-opacity-50 p-2 cursor-pointer  "
              onClick={() => handleClick(index)}
            >
              <h2 className="text-lg text-left font-semibold">
                {item.question}
              </h2>
            </div>
            {activeIndex === index && (
              <div className="bg-[#002B34] p-2 bg-opacity-50 ">
                <p className="text-white text-left">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white ">
      <header className="absolute inset-x-0 top-0 z-50">
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

      <div>
        <ProfilKampung />
        {/* POTENSI KAMPUNG */}
        <PotensiKampung />

        {/* DATA PENDUDUK */}
        <DataPenduduk />

        {/* STRUKTUR ORGANISASI */}
        <StrukturOrganisasi />

        {/* GALERI */}
        <Galeri />

        {/* FAQ Web */}
        <Footer />
        {/* <div className=" relative isolate px-6 lg:px-8  ">
          <div
            className="absolute inset-x-0 -top-[30px] -z-10 transform-gpu overflow-hidden"
            aria-hidden="true"
          >
            <div>
              <Image
                src={panitia}
                className="object-cover sm:h-[700px] h-[1000px] lg:h-auto w-full"
                alt=""
              />
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: "0.5" }}
              />
            </div>
          </div>
          <div>
            <div className=" text-center  text-white mb-5 ">
              <h1 className="underlined-berita mb-5">
                <strong>FAQ</strong>
              </h1>
              <Accordion data={data} />
            </div>

            <div
              className={
                isFooterScreen
                  ? "text-white mt-[90px]"
                  : "flex justify-between text-white md:mt-[200px] lg:mt-[200px] xl:mt-[370px]"
              }
            >
              <div>
                <h1 className=" font-semibold">Kampung Siwi</h1>
                <p>
                  {" "}
                  Kecamatan Momi Waren, Kabupaten Manokwari Selatan 98322
                  <br />
                  Email: Pemdesbejibjm@gmail.com Telp: 081226764534
                </p>
                <Image src={Image6} alt="" className="w-[80px]" />
              </div>
              <div className="mt-4">
                <h1 className="font-semibold">Media Sosial</h1>
                <div className="flex items-center">
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
                <div className="flex items-center">
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
                <div className="flex items-center">
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
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
