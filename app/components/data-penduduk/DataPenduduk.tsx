import { retrieveDataById } from "@/app/lib/firebase/services";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

interface FormValues {
  laki: string;
  totalPenduduk: string;
  perempuan: string;
  keluarga: string;
  deskripsi: string;
}

const DataPenduduk = () => {
  const [formValues, setFormValues] = useState<FormValues | any>({
    laki: "",
    totalPenduduk: "",
    perempuan: "",
    keluarga: "",
    deskripsi: "",
  });

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9CCC65"];

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
  }, []);

  const getDataProfil = async () => {
    const data: any = await retrieveDataById("dataKampung", "dataPenduduk");
    if (data) {
      setFormValues(data);
    }
  };

  return (
    <div>
      <div className="mt-[100px] px-6  text-center">
        <h1 className="text-[30px] underlined-text">
          <strong>Data Penduduk </strong>
        </h1>
        <div className="flex max-md:flex-col py-4 ">
          <div className="mt-6 md:w-[500px] md:h-[500px] flex justify-center">
            <Doughnut data={chartData} />
          </div>
          <p className="lg:w-1/2 md:m-auto px-5 text-left mt-5">
            <strong>Data Penduduk</strong>
            <br />
            {formValues.deskripsi}
          </p>
        </div>
        {/* Pie Chart */}
      </div>
    </div>
  );
};

export default DataPenduduk;
