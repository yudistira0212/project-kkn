import React, { useEffect, useState } from "react";
import Image from "next/image";
import { retrieveData } from "@/app/lib/firebase/services";
import EditPotensi from "./editPotensi";
import DeletePotensi from "./deletePotensi";

interface DataPotensi {
  id: string;
  nama: string;
  deskripsi: string;
  image: { name: string; url: string };
  createdAt: string;
}

const TablePotensi = () => {
  const [dataPotensi, setDataPotensi] = useState<DataPotensi[]>([]);
  const [sortBy, setSortBy] = useState(""); // State untuk menyimpan pilihan sorting

  useEffect(() => {
    getPotensiData();
  }, []);

  const getPotensiData = async () => {
    const data: any = await retrieveData("potensi");
    if (data) {
      setDataPotensi(data);
    }
  };

  // Fungsi untuk sorting berdasarkan createdAt, yang paling baru di atas
  const sortByCreatedAtNewestFirst = () => {
    const sortedData = [...dataPotensi].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setDataPotensi(sortedData);
  };

  // Fungsi untuk sorting berdasarkan createdAt, yang paling baru di bawah
  const sortByCreatedAtOldestFirst = () => {
    const sortedData = [...dataPotensi].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setDataPotensi(sortedData);
  };

  // Fungsi untuk mengatur jenis sorting berdasarkan pilihan dropdown
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    if (selectedSortBy === "newestFirst") {
      sortByCreatedAtNewestFirst();
    } else if (selectedSortBy === "oldestFirst") {
      sortByCreatedAtOldestFirst();
    }
  };

  return (
    <div>
      <div className="relative">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="block appearance-none w-fit bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled hidden>
            Sort By
          </option>
          <option value="newestFirst">Terbaru Paling atas</option>
          <option value="oldestFirst">Lama Plaling atas</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="table w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="border px-4  py-2">NO</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Deskripsi</th>
              <th className="border px-4 py-2">Gambar</th>
              <th className="border w-fit px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPotensi.map((potensi: DataPotensi, index: number) => (
              <tr key={potensi.id}>
                <td className="border text-center px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2 ">{potensi.nama}</td>
                <td className="border px-4 py-2 ">{potensi.deskripsi}</td>
                <td className="border px-4 py-2 ">
                  <Image
                    src={potensi.image.url}
                    alt={potensi.image.name}
                    height={500}
                    width={500}
                    className="w-full h-20 object-cover rounded-xl"
                  />
                </td>
                <td className="border w-fit px-4 py-2 ">
                  <div className="flex gap-2 justify-center">
                    <EditPotensi
                      potensiId={potensi.id}
                      potensiData={potensi}
                      onSuccess={getPotensiData}
                    />
                    <DeletePotensi
                      potensiId={potensi.id}
                      onSuccess={getPotensiData}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePotensi;
