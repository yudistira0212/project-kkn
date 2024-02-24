"use client";

import { Penduduk } from "@/app/lib/firebase/controllers/dataPendudukController";
import { retrieveDataById } from "@/app/lib/firebase/services";
import { useEffect, useState } from "react";

interface FormValues {
  laki: string;
  totalPenduduk: string;
  perempuan: string;
  keluarga: string;
}

const FromDataPenduduk: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    laki: "",
    totalPenduduk: "",
    perempuan: "",
    keluarga: "",
  });

  useEffect(() => {
    getDataProfil();
  }, [isLoading]);

  const getDataProfil = async () => {
    const data: any = await retrieveDataById("dataKampung", "dataPenduduk");
    if (data) {
      setFormValues(data);
    }

    // console.log({ data });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Penduduk(formValues, (success: boolean, message: string) => {
        if (success) {
          setIsLoading(false);
          alert(message);
          setFormValues({
            laki: "",
            totalPenduduk: "",
            perempuan: "",
            keluarga: "",
          });
        } else {
          setIsLoading(false);
          alert("Gagal memasukkan data profil: " + message);
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="laki"
          className="block text-sm font-medium text-gray-700"
        >
          Laki-laki:
        </label>
        <input
          type="number"
          name="laki"
          value={formValues.laki}
          onChange={handleInputChange}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500`}
        />
      </div>

      <div>
        <label
          htmlFor="totalPenduduk"
          className="block text-sm font-medium text-gray-700"
        >
          Total Penduduk:
        </label>
        <input
          type="number"
          name="totalPenduduk"
          value={formValues.totalPenduduk}
          onChange={handleInputChange}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 `}
        />
      </div>

      <div>
        <label
          htmlFor="perempuan"
          className="block text-sm font-medium text-gray-700"
        >
          Perempuan:
        </label>
        <input
          type="number"
          name="perempuan"
          value={formValues.perempuan}
          onChange={handleInputChange}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 `}
        />
      </div>

      <div>
        <label
          htmlFor="keluarga"
          className="block text-sm font-medium text-gray-700"
        >
          Keluarga:
        </label>
        <input
          type="number"
          name="keluarga"
          value={formValues.keluarga}
          onChange={handleInputChange}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 `}
        />
      </div>

      <button
        type="submit"
        disabled={
          !formValues.laki ||
          !formValues.totalPenduduk ||
          !formValues.perempuan ||
          !formValues.keluarga ||
          isLoading
        }
        className="mt-5 bg-indigo-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? "Loading..." : " Submit"}
      </button>
    </form>
  );
};

export default FromDataPenduduk;
