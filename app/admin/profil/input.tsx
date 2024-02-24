"use client";

import {
  createProfil,
  retrieveDataById,
  uploadImage,
} from "@/app/lib/firebase/services";
import React, { useEffect, useState } from "react";
import type { DocumentData } from "firebase/firestore";
import Image from "next/image";

const InputProfil = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [alamat, setAlamat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    getDataProfil();
  }, []);

  const getDataProfil = async () => {
    const data: any = await retrieveDataById("dataKampung", "profil");
    if (data) {
      setTitle(data.title);
      setDeskripsi(data.deskripsi);
      setAlamat(data.alamat);
      setEmail(data.email);
      setTelephone(data.telephone);
      setImageUrl(data.image.url);
    }

    // console.log({ data });
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nama-kampung") {
      setTitle(value);
    } else if (name === "alamat") {
      setAlamat(value);
    } else if (name === "telephone") {
      setTelephone(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const clearForm = () => {
    setTitle("");
    setDeskripsi("");
    setAlamat("");
    setFile(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const data = {
      title: title as string,
      alamat: alamat as string,
      deskripsi: deskripsi as string,
      email: email as string,
      telephone: telephone as string,
      image: { name: "", url: "" },
    };
    const files = file as File;

    try {
      // await uploadImage(
      //   files,
      //   "foto-kampung",
      //   (success: boolean, url: string) => {
      //     if (success) {
      //       data.img = { name: files.name, url };
      //     } else {
      //       alert(url);
      //     }
      //   }
      // );

      await createProfil(data, files, (success: boolean, message: string) => {
        if (success) {
          alert(message);
          clearForm();
          setIsSubmitted(false);
        } else {
          alert(message);
          setIsSubmitted(false);
        }
      });
    } catch (error: any) {
      console.log({ error });
      alert("error" + error);
      setIsSubmitted(false);
    }
  };

  // const isOpenHandeler = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div>
      <div className={`transition-all duration-500 ease-linear `}>
        <form onSubmit={handleSubmit} className="flex flex-col mx-10 space-y-4">
          <div>Data Kampung</div>
          <div className="flex flex-col">
            <label
              htmlFor="nama-kampung"
              className="text-gray-800 font-semibold mb-1"
            >
              Nama Kampung
            </label>
            <input
              type="text"
              name="nama-kampung"
              onChange={onChangeHandler}
              value={title}
              id="nama-kampung"
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="alamat"
              className="text-gray-800 font-semibold mb-1"
            >
              Alamat
            </label>
            <input
              type="text"
              name="alamat"
              value={alamat}
              onChange={onChangeHandler}
              id="alamat"
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="alamat"
              className="text-gray-800 font-semibold mb-1"
            >
              Nomor Telephone
            </label>
            <input
              type="text"
              name="telephone"
              value={telephone}
              onChange={onChangeHandler}
              id="alamat"
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="alamat"
              className="text-gray-800 font-semibold mb-1"
            >
              Email Kampung
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={onChangeHandler}
              id="alamat"
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="deskripsi"
              className="text-gray-800 font-semibold mb-1"
            >
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={deskripsi}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDeskripsi(e.target.value)
              }
              id="deskripsi"
              className="border h-[200px] border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          {imageUrl && (
            <div>
              <Image src={imageUrl} width={200} height={200} alt="gambar" />
            </div>
          )}
          <div className="flex flex-col">
            <label
              htmlFor="foto-kampung"
              className="text-gray-800 font-semibold mb-1"
            >
              Foto Kampung
            </label>
            <input
              type="file"
              name="foto-kampung"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files?.[0])
              }
              id="foto-kampung"
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitted}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputProfil;
