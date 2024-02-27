import { retrieveDataById } from "@/app/lib/firebase/services";
import React, { useEffect, useState } from "react";
import ReactFlow, { Controls } from "reactflow";

import "reactflow/dist/style.css";

interface FormValues {
  visi: string;
  misi: string;
  kepalaKampung: string;
  sekretaris: string;
  kasiPemerintahan: string;
  kasiKesejahteraan: string;
  kasiPelayanan: string;
  kaurTuDanUmum: string;
  kaurKeuangan: string;
  kaurPerencanna: string;
  dusunSibej: string;
  dusunPeyangau: string;
  dusunLohoy: string;
  dusunSiwiMer: string;
  dusunSaugemes: string;
  siwiGunung: string;
}

const StrukturPemerintahan = () => {
  const [formData, setFormData] = useState<FormValues>();

  useEffect(() => {
    getDataProfil();
  }, []);

  const edges = [
    { id: "1-2", source: "1", target: "2", type: "step" },
    { id: "1-3", source: "1", target: "3", type: "step" },
    { id: "1-4", source: "1", target: "4", type: "step" },
    { id: "1-5", source: "1", target: "5", type: "step" },
    { id: "1-6", source: "1", target: "6", type: "step" },
    { id: "1-7", source: "1", target: "7", type: "step" },
    { id: "1-8", source: "1", target: "8", type: "step" },
    { id: "1-9", source: "1", target: "9", type: "step" },
    { id: "1-10", source: "1", target: "10", type: "step" },
    { id: "1-11", source: "1", target: "11", type: "step" },
    { id: "2-12", source: "2", target: "12", type: "step" },
    { id: "2-13", source: "2", target: "13", type: "step" },
    { id: "2-14", source: "2", target: "14", type: "step" },
  ];

  const nodes = [
    {
      id: "1",
      data: { label: `Kepala Kampung \n ${formData?.kepalaKampung} ` },
      position: { x: 700, y: 0 },
      type: "input",
    },
    {
      id: "2",
      data: { label: `Sekretaris \n ${formData?.sekretaris}` },
      position: { x: 900, y: 105 },
    },
    {
      id: "3",
      data: { label: `KASI PEMERINTAHAN \n ${formData?.kasiPemerintahan} ` },
      position: { x: 500, y: 150 },
    },
    {
      id: "4",
      data: { label: `KASI KESEJAHTERAAN \n ${formData?.kasiKesejahteraan}` },
      position: { x: 300, y: 150 },
    },
    {
      id: "5",
      data: { label: `KASI PELAYAN \n ${formData?.kasiPelayanan}` },
      position: { x: 100, y: 150 },
    },
    {
      id: "6",
      data: { label: `DUSUN SIBEJ \n ${formData?.dusunSibej}` },
      position: { x: 100, y: 550 },
    },
    {
      id: "7",
      data: { label: `DUSUN BEYANGAU \n ${formData?.dusunPeyangau}` },
      position: { x: 300, y: 550 },
    },
    {
      id: "8",
      data: { label: `DUSUN LOHOY \n ${formData?.dusunLohoy}` },
      position: { x: 500, y: 550 },
    },
    {
      id: "9",
      data: { label: `DUSUN SIWI MER \n${formData?.dusunSiwiMer}` },
      position: { x: 700, y: 550 },
    },
    {
      id: "10",
      data: { label: `DUSUN SAUGEMES \n ${formData?.dusunSaugemes}` },
      position: { x: 900, y: 550 },
    },
    {
      id: "11",
      data: { label: `SIWI GUNUNG \n ${formData?.siwiGunung}` },
      position: { x: 1100, y: 550 },
    },
    {
      id: "12",
      data: { label: `KAUR TU & UMUM \n ${formData?.kaurTuDanUmum}` },
      position: { x: 800, y: 210 },
    },
    {
      id: "13",
      data: { label: `KAUR KEUANGAN \n ${formData?.kaurKeuangan} ` },
      position: { x: 970, y: 210 },
    },
    {
      id: "14",
      data: { label: `KAUR PERENCANAAN \n ${formData?.kaurPerencanna}` },
      position: { x: 1150, y: 210 },
    },
  ];

  const getDataProfil = async () => {
    const data: any = await retrieveDataById("dataKampung", "dataStruktur");
    if (data) {
      setFormData(data);
    }

    // console.log({ data });
  };
  return (
    <div>
      {" "}
      <div className="mt-[100px] px-6 text-center">
        <h1 className="text-[30px] underlined-text">
          <strong>Struktur Organisasi </strong>
        </h1>
        <div className="flex flex-col items-center pt-5">
          <div className="px-4 flex flex-col items-center">
            <div className="bg-[#0B3147] rounded-xl mt-2 w-[200px] h-[50px] flex items-center justify-center">
              <p className="text-white  ">VISI</p>
            </div>
            <p className=" text-center px-3 mt-2 font-semibold">
              {formData?.visi}
            </p>
          </div>
          <div className="px-4 max-md:mt-6 flex flex-col items-center">
            <div className="bg-[#0B3147] rounded-xl mt-2 w-[200px] h-[50px] flex items-center justify-center">
              <p className="text-white  ">MISI</p>
            </div>
            {formData?.misi.split("\n").map((item, index) => {
              return (
                <p key={index} className=" px-3 mt-2 font-semibold">
                  {item}
                </p>
              );
            })}
            {/* <p className=" px-3 mt-2 font-semibold">{formData?.misi}</p> */}
          </div>
        </div>
        <div className="w-full h-[510px] px-3 mb-5 mt-5">
          <ReactFlow
            fitView
            nodes={nodes}
            edges={edges}
            className="border-4 border-[#0B3147]"
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default StrukturPemerintahan;
