import { retrieveData } from "@/app/lib/firebase/services";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface dataPotensi {
  map(arg0: (potensi: any) => React.JSX.Element): React.ReactNode;
  id: String;
  nama: String;
  deskripsi: String;
  image: { name: String; url: String };
}
const PotensiKampung = () => {
  const [dataPotensi, setDataPotensi] = useState<dataPotensi>();
  useEffect(() => {
    getPotensiData();
  }, []);

  const getPotensiData = async () => {
    const data: any = await retrieveData("potensi");
    if (data) {
      setDataPotensi(data);
    }
  };

  return (
    <div>
      {" "}
      <div className="mt-[100px] px-6 text-center">
        <h1 className="text-[30px] underlined-text">
          <strong>Potensi Kampung Siwi</strong>
        </h1>
        {dataPotensi &&
          dataPotensi.map((value: any, i?: any) => (
            <div key={value.id}>
              {i % 2 === 0 ? (
                <div className="flex max-sm:flex-col py-4 ">
                  <Image
                    src={value.image.url}
                    alt={value.image.name}
                    height={500}
                    width={500}
                    className="sm:w-1/2 h-60 object-cover rounded-tr-[100px] rounded-bl-[100px] max-sm:rounded-lg sm:shadow-2xl"
                  />
                  <p className="lg:w-1/2 md:m-auto sm:px-5 text-left max-sm:text-justify">
                    <strong>{value.nama}</strong>
                    <br />
                    {value.deskripsi}
                  </p>
                </div>
              ) : (
                <div className="flex py-4 max-sm:flex-col-reverse ">
                  <p className="lg:w-1/2 md:m-auto mt-1 sm:px-5 text-right max-sm:text-justify">
                    <strong>{value.nama}</strong>
                    <br />
                    {value.deskripsi}
                  </p>
                  <Image
                    src={value.image.url}
                    alt={value.image.name}
                    height={500}
                    width={500}
                    className="sm:w-1/2 h-60 object-cover rounded-tl-[100px] rounded-br-[100px] max-sm:rounded-lg sm:shadow-2xl"
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PotensiKampung;
