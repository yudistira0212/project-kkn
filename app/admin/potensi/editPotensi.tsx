"use client";
// import { XIcon } from "@heroicons/react";
import { updatePotensi } from "@/app/lib/firebase/controllers/potensiController";
import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";

interface EditPotensiProps {
  show: boolean;
  potensiId: string;
  potensiData: any;
  onSuccess: () => void;
}

const EditPotensi: React.FC<EditPotensiProps> = ({
  show,
  potensiId,
  potensiData,
  onSuccess,
}) => {
  const [nama, setNama] = useState<string | undefined>(potensiData?.nama);
  const [deskripsi, setDeskripsi] = useState<string | undefined>(
    potensiData?.deskripsi
  );
  const [image, setImage] = useState<File | undefined>();
  const [isOpen, setIsOpen] = useState(show);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!potensiId || !potensiData || !nama || !deskripsi) {
      setIsSubmit(false);
      return;
    }

    try {
      await updatePotensi(
        potensiId,
        { nama, deskripsi },
        (success: boolean, message: string) => {
          if (success) {
            setIsOpen(false);
            onSuccess();
            console.log(message);
          }
        },
        image
      );
      setIsSubmit(false);
      setIsOpen(false);
    } catch (error) {
      setIsSubmit(false);
      console.error(error);
      // handle error
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white p-2 rounded-md flex"
      >
        edit
      </button>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          open={isOpen}
          className="relative z-10"
          onClose={() => setIsOpen(false)}
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Potensi
                    <button
                      type="button"
                      className="float-right inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="nama"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Nama
                        </label>
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="nama"
                          value={nama || ""}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="deskripsi"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Deskripsi
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="deskripsi"
                          rows={3}
                          value={deskripsi || ""}
                          onChange={(e) => setDeskripsi(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="image"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Gambar
                        </label>
                        <input
                          type="file"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="image"
                          onChange={(e) =>
                            setImage((e.target as HTMLInputElement).files?.[0])
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmit}
                        className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-wait hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        {isSubmit ? "Loading..." : "Simpan"}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditPotensi;
