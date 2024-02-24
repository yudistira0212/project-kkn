"use client";
import React, { useEffect, useState, useRef } from "react";
import EditPotensi from "./editPotensi";
import Image from "next/image";
import { retrieveData } from "@/app/lib/firebase/services";
import DeletePotensi from "./deletePotensi";

const TablePotensi = () => {
  const [dataPotensi, setDataPotensi] = useState<any>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      getPotensiData();
      isMounted.current = true;
    }
  }, []);

  const getPotensiData = async () => {
    const data: any = await retrieveData("potensi");
    if (data) {
      setDataPotensi(data);
    }
  };

  return (
    <div>
      <div className="table w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Deskripsi</th>
              <th className="border px-4 py-2">Gambar</th>
              <th className="border px-4 py-2 w-fit">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPotensi &&
              dataPotensi.map((potensi: any) => (
                <tr key={potensi.id}>
                  <td className="border px-4 py-2 ">{potensi.nama}</td>
                  <td className="border px-4 py-2 ">{potensi.deskripsi}</td>
                  <td className="border px-4 py-2 ">
                    <Image
                      src={potensi.image.url}
                      alt={potensi.image.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="border w-fit px-4 py-2 ">
                    <div className="flex gap-2 justify-center">
                      <EditPotensi
                        show={isEditModalOpen}
                        // onHide={handleEditModalClose}
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
