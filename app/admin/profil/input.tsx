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

  // const [image, setImage] = useState<File | undefined>(undefined);

  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getDataProfil();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImageUrl(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
          // clearForm();
          getDataProfil();
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
      <div className={`flex justify-between mx-5 items-center py-2`}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-4"
        >
          <div className="flex justify-between ">
            <h1 className="text-2xl font-bold">Data Kampung</h1>
            <div className="flex w-fit justify-start hover:cursor-pointer items-center gap-2 ">
              <label htmlFor="isedit" className="hover:cursor-pointer">
                {isEdit ? "Edit Aktif" : "Edit Non-Aktif"}
              </label>
              <input
                type="checkbox"
                id="isedit"
                onChange={(e) => setIsEdit(e.target.checked)}
                checked={isEdit}
                className="hover:cursor-pointer"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className=" ">
              <label
                htmlFor="foto-kampung"
                className="text-gray-800 font-semibold mb-1"
              >
                Foto Kampung
              </label>
              {imageUrl && (
                <div>
                  <Image
                    src={imageUrl}
                    width={1000}
                    height={1000}
                    alt="gambar"
                    className="w-96 object-cover rounded-xl"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <input
                  disabled={!isEdit}
                  type="file"
                  name="foto-kampung"
                  onChange={handleImageChange}
                  id="foto-kampung"
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex   flex-col">
                <label
                  htmlFor="nama-kampung"
                  className="text-gray-800 font-semibold mb-1"
                >
                  Nama Kampung
                </label>
                <input
                  disabled={!isEdit}
                  type="text"
                  name="nama-kampung"
                  onChange={onChangeHandler}
                  value={title}
                  id="nama-kampung"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                  disabled={!isEdit}
                  type="text"
                  name="alamat"
                  value={alamat}
                  onChange={onChangeHandler}
                  id="alamat"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                  disabled={!isEdit}
                  type="text"
                  name="telephone"
                  value={telephone}
                  onChange={onChangeHandler}
                  id="alamat"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                  disabled={!isEdit}
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                  id="alamat"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                  disabled={!isEdit}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDeskripsi(e.target.value)
                  }
                  id="deskripsi"
                  className="border h-[200px] border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitted || !isEdit}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-200"
            >
              {isSubmitted ? "Loading..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputProfil;
