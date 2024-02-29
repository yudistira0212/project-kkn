import { retrieveData } from "@/app/lib/firebase/services";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface dataPotensi {
  map(arg0: (potensi: any) => React.JSX.Element): React.ReactNode;
  id: String;
  nama: String;
  deskripsi: String;
  image: { name: String; url: String };
}
const PotensiKampung = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [dataPotensi, setDataPotensi] = useState<dataPotensi>();
  useEffect(() => {
    getPotensiData();
  }, []);

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

  const getPotensiData = async () => {
    const data: any = await retrieveData("potensi");
    if (data.length > 0) {
      const sortedData = data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const filteredData = sortedData.slice(0, 2);
      setDataPotensi(filteredData);
    }
  };

  return (
    <div>
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
          className={`text-center   px-6 lg:px-8 ${
            isSmallScreen ? "flex-col" : "flex justify-around items-center"
          }`}
        >
          {dataPotensi &&
            dataPotensi.map((value: any, i?: any) => (
              <div key={value.id}>
                {i % 2 === 0 ? (
                  <div className="flex flex-col md:w-[300px]">
                    <p className=" text-justify mb-1">{value.deskripsi}</p>
                    <Image
                      src={value.image.url}
                      alt={value.image.name}
                      width={500}
                      height={500}
                      className="w-full md:w-[300px]  xl:w-[300px] sm:h-[300px] object-cover object-center rounded-lg"
                    />
                  </div>
                ) : (
                  <div
                    className={`md:w-[300px] ${
                      isSmallScreen ? "flex flex-col-reverse " : ""
                    }`}
                  >
                    <div className={isSmallScreen ? "" : "flex justify-end"}>
                      <Image
                        src={value.image.url}
                        alt={value.image.name}
                        width={500}
                        height={500}
                        className="w-full md:w-[300px]  xl:w-[300px] sm:h-[300px] object-cover object-center rounded-lg"
                      />
                    </div>
                    <p
                      className={`${
                        isSmallScreen
                          ? " text-justify mt-5 mb-1"
                          : " text-justify"
                      }`}
                    >
                      {value.deskripsi}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PotensiKampung;
