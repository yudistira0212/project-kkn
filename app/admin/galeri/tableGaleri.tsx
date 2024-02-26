import React, { useEffect, useState, useRef } from "react";
// import EditPotensi from "./editPotensi";
import Image from "next/image";
import { retrieveData } from "@/app/lib/firebase/services";
import EditPotensi from "./editGaleri";
import DeleteGaleri from "./deleteGgaleri";
// import DeletePotensi from "./deletePotensi";

interface DataGaleri {
  map(arg0: (value: any) => React.JSX.Element): React.ReactNode;
  id: String;
  title: String;
  detail: String;
  image: { name: String; url: String };
}
const TableGaleri = () => {
  const [dataGaleri, setDataGaleri] = useState<DataGaleri>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    getPotensiData();
  }, []);

  const getPotensiData = async () => {
    const data: any = await retrieveData("galeri");
    if (data) {
      setDataGaleri(data);
    }
  };

  return (
    <div>
      <div className="table w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Deskripsi</th>
              <th className="border px-4 py-2">Gambar</th>
              <th className="border w-fit px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataGaleri &&
              dataGaleri?.map((value: any) => (
                <tr key={value.id}>
                  <td className="border px-4 py-2 ">{value.title}</td>
                  <td className="border px-4 py-2 ">{value.detail}</td>
                  <td className="border px-4 py-2 ">
                    <Image
                      src={value.image.url}
                      alt={value.image.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="border w-fit px-4 py-2 ">
                    <div className="flex gap-2 justify-center">
                      <EditPotensi
                        show={isEditModalOpen}
                        id={value.id}
                        dataGaleri={value}
                        onSuccess={getPotensiData}
                      />
                      <DeleteGaleri id={value.id} onSuccess={getPotensiData} />
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

export default TableGaleri;
