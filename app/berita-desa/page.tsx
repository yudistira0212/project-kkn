"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Berita1 from "./Rectangle 9.png";
import Berita2 from "./Rectangle 8.png";
import Berita3 from "./Rectangle 10.png";
import IconTime from "./formkit_time.png";
import IconWrite from "./jam_write.png";
import Facebook from "./basil_facebook-solid.png";
import Instagram from "./mdi_instagram.png";
import Youtube from "./fa6-brands_youtube.png";

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Berita Desa", href: "berita-desa" },
  { name: "Data Desa", href: "album" },
  { name: "Pemerintahan Desa", href: "baru" },
  { name: "Lembaga Desa", href: "#" },
  { name: "Profil Desa", href: "#" },
];
const berita = [
  {
    title: "Pembalap Ranski Sedang Berlibur",
    date: "12-12-2023",
    penulis: "Victor Ganteng Banget!",
    gambar: Berita1,
    detailsGambar:
      "Diambil ketika sedang berada di daerah sekitar Gunung Botak",
    isiBerita:
      "Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa ipsum. Diam habitant a ultrices neque suscipit eget at. Lectus quam maecenas volutpat ipsum praesent praesent facilisis. Molestie ligula convallis enim quam. \nLorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa ipsum. Diam habitant a ultrices neque suscipit eget at. Lectus quam maecenas volutpat ipsum praesent praesent facilisis. Molestie ligula convallis enim quam. \n Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa ipsum. Diam habitant a ultrices neque suscipit eget at. Lectus quam maecenas volutpat ipsum praesent praesent facilisis. Molestie ligula convallis enim quam.",
    comments: {
      commment1: {
        nama: "VG Pu Teman",
        isiComments: "Adoh sa teman 1 nih datang tra kasih kabar",
        tanggalComment: "12-12-2023",
      },
      commment2: {
        nama: "Pembalap pu pacar",
        isiComments: "ba libur sendiri sendiri tanpa tong ehh, bagus oh....",
        tanggalComment: "12-12-2023",
      },
      commment3: {
        nama: "Fans berat, berat sekali",
        isiComments: "kaka race nanti dmna lgi eh? info info?",
        tanggalComment: "12-12-2023",
      },
    },
    beritaLainnya: {
      berita1: {
        gambar: Berita2,
        title: "Pemandangan Indah Gunung Botak",
        date: "06-12-2023",
        isiBerita:
          "Lorem ipsum dolor sit amet consectetur. Accumsan integer mollis proin nunc. \n Varius morbi dui consequat feugiat convallis sed at. Nunc nunc praesent sagittis sit. Tincidunt sodales duis mi nibh senectus.",
      },
      berita2: {
        gambar: Berita3,
        title: "Pemandangan Indah Gunung Botak",
        date: "06-12-2023",
        isiBerita:
          "Lorem ipsum dolor sit amet consectetur. Accumsan integer mollis proin nunc. Varius morbi dui consequat feugiat convallis sed at. Nunc nunc praesent sagittis sit. Tincidunt sodales duis mi nibh senectus.",
      },
    },
  },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSplitScreen, setIsSplitScreen] = useState(false);

  const formatDate = (shortDate) => {
    const [day, month, year] = shortDate.split("-");

    // Menggunakan objek Date untuk mendapatkan nama bulan
    const dateObject = new Date(`${year}-${month}-${day}`);
    const monthName = dateObject.toLocaleString("en-US", { month: "long" });

    // Membuat long date dengan format "Month day, Year"
    const longDate = `${monthName} ${parseInt(day, 10)}, ${year}`;

    return longDate;
  };

  useEffect(() => {
    // Function to check the screen size and update state
    const handleResize = () => {
      setIsSplitScreen(window.innerWidth < 768);
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
  return (
    <div className="bg-[#F3F3F3] ">
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
              <Bars3Icon className="h-6 w-6" aria-hidden="true" color="black" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${item.href}`}
                className="text-sm font-semibold leading-6 text-black"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-black">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
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

      <div
        className={
          isSplitScreen
            ? "relative isolate px-6 pt-14 lg:px-8 "
            : "relative isolate px-6 pt-14 lg:px-8 flex justify-between"
        }
      >
        <div className="w-full md:w-2/3 md:pe-5 p-0">
          <div className="text-justify">
            {berita.map((data) => (
              <>
                <h1 className="text-4xl font-bold tracking-tight text-[#0B3147] sm:text-6xl mt-6 text-left">
                  {data.title}
                </h1>
                <div className="flex ">
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p className="ms-1 font-light">{formatDate(data.date)}</p>
                </div>
                <p className="font-semibold">{data.penulis}</p>
                <Image
                  alt=""
                  src={data.gambar}
                  className="w-full object-cover h-[300px] mt-5 rounded-md"
                />

                <p className="text-gray-500 italic font-light">
                  {data.detailsGambar}
                </p>
                {data.isiBerita.split("\n").map((paragraph, index) => (
                  <p
                    className="mt-6 text-lg leading-8 text-black line-clamp-3 sm:line-clamp-none"
                    key={index}
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="flex my-3 comment-container">
                  <Image alt="" src={IconWrite} />
                  <p>Silahkan tulis komentar anda</p>
                </div>
              </>
            ))}
          </div>

          <div>
            <div className="mb-2">
              <div className="md:flex justify-between my-2">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="border p-2 w-full sm:w-1/3"
                  // w-full memberikan lebar penuh, sm:w-1/3 membuatnya mengecil jika layar mengecil
                />
                <input
                  type="text"
                  placeholder="No Handphone"
                  className="border p-2 w-full sm:w-1/3"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 w-full sm:w-1/3"
                />
              </div>
              <textarea
                placeholder="Komentar Anda..."
                className="border p-2 w-full h-32"
              />
            </div>
            <button className="border p-2 bg-[#0B3147] text-white w-[200px] rounded md:mb-[100px]">
              Kirim
            </button>
          </div>
        </div>
        <hr className="my-6 border-black" />

        <div className="md:w-1/3 w-full">
          {berita.map((data) => (
            <>
              {/* Displaying current comments */}
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Komentar Terkini
                </h2>
                {data.comments &&
                  Object.values(data.comments).map((comment, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">{comment.nama}:</p>
                      <p>{comment.isiComments}</p>
                      <p className="text-gray-500">
                        Ditulis pada {formatDate(comment.tanggalComment)}
                      </p>
                    </div>
                  ))}
              </div>
              {/* Divider Line */}
              <hr className="my-6 border-black" />
              {/* Displaying other news */}
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Berita Lainnya</h2>
                {data.beritaLainnya &&
                  Object.values(data.beritaLainnya).map((beritaLain, index) => (
                    <div key={index} className="mb-4 sm:flex">
                      <Image
                        alt=""
                        src={beritaLain.gambar}
                        className="sm:w-1/3 md:w-1/2 w-full object-cover h-[200px] rounded-lg"
                      />
                      <div className="p-2 flex-col items-end mt-auto md:w-1/2 sm:w-3/4">
                        {" "}
                        <h3 className="mt-2 text-lg font-bold line-clamp-3">
                          {beritaLain.title}
                        </h3>
                        <p className="text-gray-500">{beritaLain.date}</p>
                        <p className="text-justify line-clamp-3">
                          {beritaLain.isiBerita}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ))}
          <hr className="my-6 border-black" />

          <div>
            <h2 className="text-2xl font-semibold">Sosial Media</h2>
            <div className="flex items-center">
              {/* Youtube */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M21.7 8c0-.7-.4-1.3-.8-2c-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9c-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3c0 .7.4 1.3.8 2c.6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9c.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2M10 14.6V9l5.4 2.8z"
                  clip-rule="evenodd"
                />
              </svg>
              {/* Instagram */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29px"
                height="29px"
                viewBox="0 0 24 24"
                style={{ marginRight: "4px" }}
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                />
              </svg>
              {/* Facebook */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23px"
                height="23px"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.578v-7.745H8.076V9.237h2.606V7.01c0-2.584 1.578-3.99 3.883-3.99c1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.596-1.496 1.47v1.927h2.989l-.39 3.018h-2.6V20h5.097c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0"
                />
              </svg>
            </div>
          </div>
          <hr className="my-6 border-black" />
        </div>
      </div>

      <footer className="md:flex  py-[30px] items-center px-8 pb-5 bg-[#0B3147] text-white">
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
