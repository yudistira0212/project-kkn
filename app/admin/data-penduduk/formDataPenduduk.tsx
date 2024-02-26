"use client";

import { Penduduk } from "@/app/lib/firebase/controllers/dataPendudukController";
import { retrieveDataById } from "@/app/lib/firebase/services";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

interface FormValues {
  laki: string;
  totalPenduduk: string;
  perempuan: string;
  keluarga: string;
  deskripsi: string;
}

const FromDataPenduduk: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    laki: "",
    totalPenduduk: "",
    perempuan: "",
    keluarga: "",
    deskripsi: "",
  });

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

  const dataPenduduk = [
    { name: "Jumlah Keluarga", value: formValues.keluarga },
    { name: "Jumlah Penduduk", value: formValues.totalPenduduk },
    { name: "Jumlah Laki-laki", value: formValues.laki },
    { name: "Jumlah Perempuan", value: formValues.perempuan },
  ];

  const chartData = {
    labels: dataPenduduk.map((item) => item.name),
    datasets: [
      {
        data: dataPenduduk.map((item) => item.value),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    <div>
      <div className="flex justify-between m-5 mx-9">
        <form onSubmit={handleSubmit} className="w-full">
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
              disabled={!isEdit}
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
              disabled={!isEdit}
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
              disabled={!isEdit}
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
              disabled={!isEdit}
              value={formValues.keluarga}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 `}
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
              disabled={!isEdit}
              value={formValues.deskripsi}
              onChange={handleInputChange}
              id="deskripsi"
              className="border h-[100px] border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={
              !formValues.laki ||
              !formValues.totalPenduduk ||
              !formValues.perempuan ||
              !formValues.keluarga ||
              isLoading ||
              !isEdit
            }
            className="mt-5 bg-indigo-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : " Submit"}
          </button>
        </form>
        <div className="w-[400px] h-[400px] flex justify-center">
          <h2 className="text-2xl">Pie Chart</h2>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default FromDataPenduduk;
