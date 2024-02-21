"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import panitia from "./images/gaul.jpg";

import Gambar1 from "./images/GAMBAR 1.jpg";
import Gambar2 from "./images/GAMBAR 2.jpg";
import Gambar3 from "./images/GAMBAR 3.jpg";
import Gambar4 from "./images/GAMBAR 4.jpg";
import Gambar5 from "./images/GAMBAR 5.jpg";
import Gambar6 from "./images/GAMBAR 6.jpg";
import Gambar7 from "./images/Struktur Organisasi.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const navigation = [
  { name: "Beranda", href: "" },
  { name: "Potensi Kampung", href: "potensi" },
  { name: "Data Penduduk", href: "data-penduduk" },
  { name: "Galeri", href: "galeri" },
  { name: "Struktur Pemerintahan ", href: "struktur-organisasi" },
];

interface AccordionProps {
  data: {
    question: string;
    answer: string;
  }[];
}

const dataPenduduk = [
  {
    id: "1",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        viewBox="0 0 48 48"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="4"
        >
          <path d="M10 19s-5.143 2-6 9m34-9s5.143 2 6 9m-26-9s4.8 1.167 6 7m6-7s-4.8 1.167-6 7m-4 8s-4.2.75-6 6m14-6s4.2.75 6 6" />
          <circle cx="24" cy="31" r="5" stroke-linejoin="round" />
          <circle cx="34" cy="14" r="6" stroke-linejoin="round" />
          <circle cx="14" cy="14" r="6" stroke-linejoin="round" />
        </g>
      </svg>
    ),
    title: "Jumlah Keluarga 2023",
    content: "9999",
  },
  {
    id: "2",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6.004 6.004 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0M10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0"
        />
      </svg>
    ),
    title: "Jumlah Penduduk",
    content: "9999",
  },
  {
    id: "3",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M874 120H622c-3.3 0-6 2.7-6 6v56c0 3.3 2.7 6 6 6h160.4L583.1 387.3c-50-38.5-111-59.3-175.1-59.3c-76.9 0-149.3 30-203.6 84.4S120 539.1 120 616s30 149.3 84.4 203.6C258.7 874 331.1 904 408 904s149.3-30 203.6-84.4C666 765.3 696 692.9 696 616c0-64.1-20.8-124.9-59.2-174.9L836 241.9V402c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V150c0-16.5-13.5-30-30-30M408 828c-116.9 0-212-95.1-212-212s95.1-212 212-212s212 95.1 212 212s-95.1 212-212 212"
        />
      </svg>
    ),
    title: "Jumlah Laki-laki",
    content: "9999",
  },
  {
    id: "4",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M12 2.75a6.25 6.25 0 1 0 0 12.5a6.25 6.25 0 0 0 0-12.5M4.25 9a7.75 7.75 0 1 1 8.5 7.714v1.036h1.75a.75.75 0 0 1 0 1.5h-1.75V22a.75.75 0 1 1-1.5 0v-2.75H9.5a.75.75 0 0 1 0-1.5h1.75v-1.036A7.75 7.75 0 0 1 4.25 9"
          clip-rule="evenodd"
        />
      </svg>
    ),
    title: "Jumlah Perempuan",
    content: "9999",
  },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSlideScreen, setIsSlideScreen] = useState(false);
  const [isFooterScreen, setIsFooterScreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleClick = (index: number | null) => {
    setActiveIndex((prevIndex: number | null) =>
      prevIndex === index ? null : index
    );
  };

  useEffect(() => {
    // Function to check the screen size and update state
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Initial check on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  //SLIDE State
  useEffect(() => {
    // Function to check the screen size and update state
    const handleResizeSlide = () => {
      setIsSlideScreen(window.innerWidth < 385);
    };

    // Initial check on mount
    handleResizeSlide();

    // Event listener for window resize
    window.addEventListener("resize", handleResizeSlide);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResizeSlide);
    };
  }, []);
  //Footer State
  useEffect(() => {
    // Function to check the screen size and update state
    const handleResizeFooter = () => {
      setIsFooterScreen(window.innerWidth < 870);
    };

    // Initial check on mount
    handleResizeFooter();

    // Event listener for window resize
    window.addEventListener("resize", handleResizeFooter);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResizeFooter);
    };
  });

  const Accordion: React.FC<AccordionProps> = ({ data }) => {
    return (
      <div className="w-full">
        {data.map((item, index) => (
          <div key={index} className="mb-2 w-auto">
            <div
              className="bg-[#002B34] bg-opacity-50 p-2 cursor-pointer rounded-md "
              onClick={() => handleClick(index)}
            >
              <h2 className="text-lg text-left font-semibold">
                {item.question}
              </h2>
            </div>
            {activeIndex === index && (
              <div className="bg-[#002B34] p-2 bg-opacity-50">
                <p className="text-white text-left">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const data = [
    {
      question: "Apa itu webste Kampung Siwi?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Accumsan integer mollis proin nunc. Varius morbi dui consequat feugiat convallis sed at. Nunc nunc praesent sagittis sit. Tincidunt sodales duis mi nibh senectus.",
    },
    {
      question: "Fitur apa saja yang dimiliki website Kampung Siwi?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Accumsan integer mollis proin nunc. Varius morbi dui consequat feugiat convallis sed at. Nunc nunc praesent sagittis sit. Tincidunt sodales duis mi nibh senectus.",
    },
    {
      question: "Mengapa harus menggunakan website Kampung Siwi?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Accumsan integer mollis proin nunc. Varius morbi dui consequat feugiat convallis sed at. Nunc nunc praesent sagittis sit. Tincidunt sodales duis mi nibh senectus.",
    },
    {
      question: "Keuntungan menggunakan website Kampung Siwi?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Accumsan integer mollis proin nunc. Varius morbi dui consequat feugiat convallis sed at. Nunc nunc praesent sagittis sit. Tincidunt sodales duis mi nibh senectus.",
    },
  ];

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

      <div>
        <div className=" relative isolate px-6 pt-14 lg:px-8 ">
          <div
            className="absolute inset-x-0 -top-[50px] -z-10 transform-gpu overflow-hidden"
            aria-hidden="true"
          >
            <div>
              <Image
                src={panitia}
                className="object-cover h-[700px] lg:h-auto w-full"
                alt=""
              />
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: "0.5" }}
              />
            </div>
          </div>
          <div className="max-w-2xl mt-[300px] sm:mt-[250px] lg:mt-56 xl:mt-[250px] 2xl:mt-[300px] relative z-10 mb-[120px] lg:mb-190px] xl:mb-[350px] 2xl:mb-[1200px]">
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Kampung Siwi
              </h1>
              <p className="mt-6 text-lg leading-8 text-white line-clamp-3 sm:line-clamp-none">
                Kampung Siwi merupakan salah satu Kampung dari tujuh kampung
                dalam wilayah administratif pemerintahan Distrik Momi Waren
                Kabupaten Manokwari Selatan. Kampung ini terbagi dalam enam
                Dusun yaitu : Dusun Siwi 1, Dusun Lohoy, Dusun Beyangau, Dusun
                Siwimer, Dusun Saugemes, dan Dusun Siwi Gunung.
              </p>
              <button className=" p-2 bg-[#0B3147] text-white w-[200px] rounded-[50px]">
                Video Profil Kampung
              </button>
            </div>
          </div>
        </div>
        {/* POTENSI KAMPUNG */}
        <div
          className=" text-center 
          px-6  lg:px-8 "
        >
          <Link href={"/potensi"}>
            <h1 className="underlined-text mb-[30px]">
              <strong>POTENSI KAMPUNG</strong>
            </h1>
          </Link>

          <div
            className={`text-center px-6 lg:px-8 ${
              isSmallScreen ? "flex-col" : "flex justify-around items-center"
            }`}
          >
            <div className="flex flex-col">
              <p className="lg:w-[400px] xl:w-[400px] text-left ">
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. Diam habitant a ultrices neque suscipit eget at. Lectus
                quam maecenas volutpat ipsum praesent praesent facilisis.
                Molestie ligula convallis enim quam.
              </p>
              <Image
                src={Gambar2}
                alt=""
                className="w-full md:w-[300px]  xl:w-[400px] sm:h-[400px] object-cover object-center"
              />
            </div>

            {isSmallScreen ? "" : <div className="vertical-line py-6" />}

            <div className={`${isSmallScreen ? "flex flex-col-reverse" : ""}`}>
              <div className={isSmallScreen ? "" : "flex justify-end"}>
                <Image
                  src={Gambar3}
                  alt=""
                  className="w-full md:w-[300px]  xl:w-[400px] sm:h-[400px] object-cover object-center"
                />
              </div>
              <p
                className={`${
                  isSmallScreen
                    ? "lg:w-[400px] xl:w-[400px] text-left"
                    : "lg:w-[400px] xl:w-[400px] text-right"
                }`}
              >
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. Diam habitant a ultrices neque suscipit eget at. Lectus
                quam maecenas volutpat ipsum praesent praesent facilisis.
                Molestie ligula convallis enim quam.
              </p>
            </div>
          </div>
        </div>
        {/* DATA PENDUDUK */}
        <div className=" text-center md:px-6  pt-5 lg:px-6 bg-[#0B3147] text-white mt-6 pb-[100px]">
          <Link href={"/potensi"}>
            <h1 className="underlined-berita mb-5">
              <strong>DATA PENDUDUK</strong>
            </h1>
          </Link>
          <div
            className={
              isSlideScreen
                ? "flex-col"
                : "md:flex justify-around grid grid-cols-2"
            }
          >
            {dataPenduduk.map((data, index) => (
              <>
                {" "}
                <div key={data.id} className="px-3 mt-[20px]">
                  <div className="grid justify-items-center">
                    {data.icon}
                    <h1> {data.title} </h1>
                  </div>
                  <h1 className="font-bold text-[45px]">{data.content}</h1>
                </div>
                {isSmallScreen
                  ? ""
                  : index < dataPenduduk.length - 1 && (
                      <div className="divider" />
                    )}
              </>
            ))}
          </div>
        </div>
        {/* STRUKTUR ORGANISASI */}
        <div className="text-center pt-3">
          {" "}
          <Link href={"/struktur-organisasi"}>
            <h1 className="underlined-text mb-5 ">
              <strong>STRUKTUR ORGANISASI</strong>
            </h1>
          </Link>
          <Image src={Gambar7} alt="" className="w-full px-1" />
        </div>
        {/* GALERI */}
        <div className=" text-center   pt-6  text-black bg-[#0B3147]  pb-[100px]">
          <Link href={"/galeri"}>
            <h1 className="underlined-berita text-white mb-5">
              <strong>GALERI</strong>
            </h1>
          </Link>
          <div className="text-white">
            <div className="flex max-lg:flex-col items-start ">
              <Image
                src={Gambar1}
                alt=""
                className="w-[700px] rounded-r-[500px]"
              />
              <p className="text-left lg:m-auto p-5">
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. <br /> <strong>Kacang</strong>
              </p>
            </div>
            <div className="flex flex-row-reverse py-5 max-lg:flex-col items-end">
              <Image
                src={Gambar5}
                alt=""
                className="w-[700px] rounded-l-[500px]"
              />
              <p className="text-right  lg:m-auto p-5">
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. <br /> <strong>Kacang</strong>
              </p>
            </div>
            <div className="flex  max-lg:flex-col pb-5 items-start">
              <Image
                src={Gambar4}
                alt=""
                className="w-[700px] rounded-r-[500px]"
              />
              <p className="text-left lg:m-auto p-5">
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. <br /> <strong>Kacang</strong>
              </p>
            </div>
            <div className="flex flex-row-reverse max-lg:flex-col  items-end">
              <Image
                src={Gambar6}
                alt=""
                className="w-[700px] rounded-l-[500px]"
              />
              <p className="text-right  lg:m-auto p-5">
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. <br /> <strong>Kacang</strong>
              </p>
            </div>
          </div>
        </div>
        {/* FAQ Web */}
        <div className=" relative isolate px-6 lg:px-8  ">
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
                Jl. Raya Beji No. 13 Desa Beji Kec. Banjarmangu Kode Pos 53452
                <br />
                Kecamatan Banjarmangu Kabupaten Banjarnegara Provinsi Jawa
                Tengah Kode Pos 53452 <br />
                Email: Pemdesbejibjm@gmail.com Telp: 081226764534
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
        </div>
      </div>
    </div>
  );
}
