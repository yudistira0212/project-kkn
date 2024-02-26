"use client";
import React, { useState } from "react";
import { createPotensi } from "@/app/lib/firebase/controllers/potensiController";
import Modal from "react-modal";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

interface InputPotensiModalProps {
  onSuccess: () => void;
}

const InputPotensiModal: React.FC<InputPotensiModalProps> = ({ onSuccess }) => {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImageUrl(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!nama || !deskripsi || !image) {
      console.log("Harap isi semua bidang");
      setIsLoading(false);
      return;
    }

    const dataProfil = {
      nama: nama,
      deskripsi: deskripsi,
      image: { name: image.name, url: imageUrl },
    };

    try {
      await createPotensi(
        dataProfil,
        image,
        (success: boolean, message: string) => {
          if (success) {
            console.log(message);
            // Bersihkan formulir setelah berhasil membuat entri
            onSuccess();
            setNama("");
            setDeskripsi("");
            setImage(undefined);
            setImageUrl("");
            setModalIsOpen(false);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            console.error(message);
          }
        }
      );
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error("Gagal membuat entri potensi:", error.message);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white p-2 rounded-md flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />{" "}
        </svg>{" "}
      </button>

      <Transition appear show={modalIsOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModalIsOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h2" className="text-xl font-semibold mb-4">
                    Buat Potensi
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-2">
                        Nama:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description" className="block mb-2">
                        Deskripsi:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        height={500}
                        width={500}
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    )}
                    <div className="mb-4">
                      <label htmlFor="image" className="block mb-2">
                        Gambar:
                      </label>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 disabled:bg-blue-200 disabled:cursor-wait text-white p-2 rounded-md"
                      >
                        {isLoading ? "Loading..." : "Simpan"}
                      </button>
                      <button
                        onClick={() => setModalIsOpen(false)}
                        className="bg-gray-500 text-white p-2 rounded-md ml-2"
                      >
                        tutup
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default InputPotensiModal;
