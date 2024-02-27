import { retrieveData } from "@/app/lib/firebase/services";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface typeDataGaleri {
  map: any;
  detail: string;
  image: { name: string; url: string };
  title: string;
}
const Galeri = () => {
  const [dataGaleri, setDataGaleri] = useState<typeDataGaleri | undefined>();

  useEffect(() => {
    getDataProfil();
  }, []);

  const getDataProfil = async () => {
    const data: any = await retrieveData("galeri");
    if (data) {
      if (data.length > 0) {
        const filteredData = data.slice(0, 4);
        setDataGaleri(filteredData);
      }
    }
  };
  return (
    <div className=" text-center   pt-6  text-black bg-[#0B3147]  pb-[100px]">
      <Link href={"/galeri"}>
        <h1 className="underlined-berita text-white mb-6">
          <strong>GALERI</strong>
        </h1>
      </Link>
      <div className="text-white">
        {dataGaleri &&
          dataGaleri.map((data: any, i: any) => (
            <div key={data.id}>
              {i % 2 === 0 ? (
                <div className="flex max-lg:flex-col  items-start ">
                  <Image
                    src={data.image.url}
                    alt={data.title}
                    width={500}
                    height={500}
                    className="w-[700px] rounded-r-[500px] h-72 object-cover"
                  />
                  <p className="text-left lg:m-auto p-5">{data.detail}</p>
                </div>
              ) : (
                <div className="flex flex-row-reverse py-5 max-lg:flex-col items-end">
                  <Image
                    alt={data.title}
                    width={500}
                    src={data.image.url}
                    height={500}
                    className="w-[700px] rounded-l-[500px] h-72 object-cover"
                  />
                  <p className="text-right  lg:m-auto p-5">
                    {data.detail}
                    <br />
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Galeri;
