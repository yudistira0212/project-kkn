import { deletePotensi } from "@/app/lib/firebase/controllers/potensiController";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";

interface deletePotensiProps {
  potensiId: string;
  onSuccess: () => void;
}

const DeletePotensi: React.FC<deletePotensiProps> = ({
  potensiId,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    await deletePotensi(potensiId, (success: boolean, message: string) => {
      setIsLoading(false);
      if (success) {
        onSuccess();
      } else {
        setErrorMessage(message);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
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
                  <Dialog.Title className="text-xl font-semibold">
                    Delete Potensi
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 mb-4">
                    Yakin ingin menghapus potensi ini?
                  </Dialog.Description>
                  {errorMessage && (
                    <div className="bg-red-100 p-2 rounded mb-4">
                      {errorMessage}
                    </div>
                  )}
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Delete"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeletePotensi;
