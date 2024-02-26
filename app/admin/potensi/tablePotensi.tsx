import React, { useEffect, useState, useRef } from "react";
import EditPotensi from "./editPotensi";
import Image from "next/image";
import { retrieveData } from "@/app/lib/firebase/services";
import DeletePotensi from "./deletePotensi";

interface dataPotensi {
  map(arg0: (potensi: any) => React.JSX.Element): React.ReactNode;
  id: String;
  nama: String;
  deskripsi: String;
  image: { name: String; url: String };
}
const TablePotensi = () => {
  const [dataPotensi, setDataPotensi] = useState<dataPotensi>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    getPotensiData();
  }, []);

  const getPotensiData = async () => {
    const data: any = await retrieveData("potensi");
    if (data) {
      setDataPotensi(data);
      console.log("tesssssss");
      console.log({ dataPotensi });
    }
  };

  return (
    <div>
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
            {dataPotensi &&
              dataPotensi.map((potensi: any, index?: any) => (
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
                        show={isEditModalOpen}
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
