import { retrieveDataById } from "@/app/lib/firebase/services";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProfilKampung = () => {
  const [profil, setProfil] = useState<any>({
    title: "",
    alamat: "",
    deskripsi: "",
    email: "",
    telephone: "",
    image: { name: "", url: "" },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data: any = await retrieveDataById("dataKampung", "profil");

      if (data) {
        setProfil(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative isolate px-6 pt-14 lg:px-8 ">
      <div
        className="absolute inset-x-0 -top-[50px] -z-10 transform-gpu overflow-hidden"
        aria-hidden="true"
      >
        <div>
          <Image
            src={profil.image.url}
            className="object-cover h-[100vh]  w-full"
            width={1000}
            height={100}
            alt="gaul"
          ></Image>
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: "0.5" }}
          />
        </div>
      </div>
      <div className="max-w-2xl  mt-[200px] sm:mt-[130px] lg:mt-[100px] xl:mt-[200px] 2xl:mt-[200px] relative z-10 mb-[120px] lg:mb-190px] xl:mb-[300px] 2xl:mb-[1200px]">
        <div className="text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {profil.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white line-clamp-3 sm:line-clamp-none">
            {profil.deskripsi}
          </p>
          <button className=" p-2 bg-[#0B3147] text-white w-[200px] rounded-[50px]">
            Video Profil Kampung
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilKampung;
