import { retrieveDataById } from "@/app/lib/firebase/services";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FormValues {
  laki: string;
  totalPenduduk: string;
  perempuan: string;
  keluarga: string;
  deskripsi: string;
}

const DataPenduduk = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSlideScreen, setIsSlideScreen] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    laki: "",
    totalPenduduk: "",
    perempuan: "",
    keluarga: "",
    deskripsi: "",
  });

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

  useEffect(() => {
    getDataProfil();
  }, []);

  const getDataProfil = async () => {
    const data: any = await retrieveDataById("dataKampung", "dataPenduduk");
    if (data) {
      setFormValues(data);
    }

    // console.log({ data });
  };

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
      title: "Jumlah Keluarga",
      content: `${formValues.keluarga}`,
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
      content: `${formValues.totalPenduduk}`,
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
      content: `${formValues.laki}`,
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
      content: `${formValues.perempuan}`,
    },
  ];
  return (
    <div>
      {" "}
      <div className=" text-center md:px-6  pt-5 lg:px-6 bg-[#0B3147] text-white mt-6 pb-[100px]">
        <Link href={"/data-penduduk"}>
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
    </div>
  );
};

export default DataPenduduk;
