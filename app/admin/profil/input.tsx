"use client";

import {
  createProfil,
  retrieveDataById,
  uploadImage,
} from "@/app/lib/firebase/services";
import React, { useEffect, useState } from "react";
import type { DocumentData } from "firebase/firestore";
import Image from "next/image";

interface FormValues {
  title: string;
  alamat: string;
  deskripsi: string;
  email: string;
  telephone: string;
  image: { name: string; url: string };
}

const InputProfil = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    alamat: "",
    deskripsi: "",
    email: "",
    telephone: "",
    image: { name: "", url: "" },
  });

  // const [image, setImage] = useState<File | undefined>(undefined);

  const [file, setFile] = useState<File>();

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const getDataProfil = async () => {
    const data: any = await retrieveDataById("dataKampung", "profil");
    if (data) {
      setFormValues(data);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    const files = file as File;
    try {
      await createProfil(
        formValues,
        (success: boolean, message: string) => {
          if (success) {
            alert(message);

            getDataProfil();
            setIsEdit(false);
            setIsSubmitted(false);
          } else {
            alert(message);
            setIsSubmitted(false);
          }
        },
        files
      );
    } catch (error) {
      console.log({ error });
      alert("error" + error);
      setIsSubmitted(false);
    }
  };

  return (
    <div>
      <div className={`flex justify-between  items-center`}>
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
              {imageUrl ? (
                <div>
                  <Image
                    src={imageUrl}
                    width={1000}
                    height={1000}
                    alt="gambar"
                    className="w-96 object-cover rounded-xl"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src={formValues.image.url}
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
                  htmlFor="title"
                  className="text-gray-800 font-semibold mb-1"
                >
                  Nama Kampung
                </label>
                <input
                  disabled={!isEdit}
                  type="text"
                  name="title"
                  onChange={handleInputChange}
                  value={formValues.title}
                  id="title"
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
                  onChange={handleInputChange}
                  value={formValues.alamat}
                  id="alamat"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="telephone"
                  className="text-gray-800 font-semibold mb-1"
                >
                  Nomor Telephone
                </label>
                <input
                  disabled={!isEdit}
                  type="number"
                  name="telephone"
                  onChange={handleInputChange}
                  value={formValues.telephone}
                  id="telephone"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-gray-800 font-semibold mb-1"
                >
                  Email Kampung
                </label>
                <input
                  disabled={!isEdit}
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  value={formValues.email}
                  id="email"
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
                  onChange={handleInputChange}
                  value={formValues.deskripsi}
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
