"use client";

import { createProfil, uploadImage } from "@/app/lib/firebase/services";
import React, { useState } from "react";

const InputProfil = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [alamat, setAlamat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nama-kampung") {
      setTitle(value);
    } else if (name === "alamat") {
      setAlamat(value);
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
      img: {} as { name: string; url: string },
    };
    const files = file as File;

    try {
      await uploadImage(
        files,
        "foto-kampung",
        (success: boolean, url: string) => {
          if (success) {
            data.img = { name: files.name, url };
          } else {
            alert(url);
          }
        }
      );

      await createProfil(data, (success: boolean, message: string) => {
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

  const isOpenHandeler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="m-3" onClick={isOpenHandeler}>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
      </button>
      <div
        className={`transition-all duration-500 ease-linear ${
          isOpen ? "h-auto" : "h-0  overflow-hidden"
        }`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col mx-10 space-y-4">
          <div>Input data kampung</div>
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
