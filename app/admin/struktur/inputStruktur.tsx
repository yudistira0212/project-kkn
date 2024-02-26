"use client";

import { struktur } from "@/app/lib/firebase/controllers/strukturController";
import { retrieveDataById } from "@/app/lib/firebase/services";
import React, { useEffect, useState } from "react";

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

const InputStruktur = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<FormValues>({
    visi: "",
    misi: "",
    kepalaKampung: "DEREK L. AINUSI, S.H",
    sekretaris: "YOEL TRIRBO",
    kasiPemerintahan: "AMOS AINUSI",
    kasiKesejahteraan: "YOEL TRIRBO",
    kasiPelayanan: "SARMAN TRIRBO",
    dusunSibej: "ULIS AINUSI",
    dusunPeyangau: "MESAK MANDACAN",
    dusunLohoy: "BOMAN TRIRBO",
    dusunSiwiMer: "YOKAB TRIRBO",
    dusunSaugemes: "ALFONS TRIRBO",
    siwiGunung: "LEVINUS IBA",
    kaurTuDanUmum: "LEWI AINUSI, S.E",
    kaurKeuangan: "YOHANES TRIRBO, S.H",
    kaurPerencanna: "KELIOPAS TRIRBO",
  });

  useEffect(() => {
    getDataProfil();
  }, []);

  const getDataProfil = async () => {
    const data: any = await retrieveDataById("dataKampung", "dataStruktur");
    if (data) {
      setFormData(data);
    }

    // console.log({ data });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    console.log("Form submitted:", formData);
    try {
      await struktur(formData, (success: boolean, message: string) => {
        if (success) {
          setIsLoading(false);
          getDataProfil();
          alert(message);
          setIsEdit(false);
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
      <div className="flex  justify-between mx-5 my-2">
        <h1 className="text-2xl font-bold">Struktur Organisasi</h1>
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
      </div>

      <form onSubmit={handleSubmit} className="m-5 ">
        <div className="flex gap-3">
          <div className="flex flex-col h-60 justify-between w-full">
            <label htmlFor="visi" className="font-semibold">
              Visi
            </label>
            <textarea
              disabled={!isEdit}
              id="visi"
              name="visi"
              value={formData.visi}
              onChange={handleChange}
              className="border h-[200px] rounded-md py-2 px-3 mb-4"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="misi" className="font-semibold">
              Misi
            </label>
            <textarea
              disabled={!isEdit}
              id="misi"
              name="misi"
              value={formData.misi}
              onChange={handleChange}
              className="border h-[200px] rounded-md py-2 px-3 mb-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col col-end-1 justify-between w-full">
            <label htmlFor="kepalaKampung" className="font-semibold">
              KEPALA KAMPUNG
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="kepalaKampung"
              name="kepalaKampung"
              value={formData.kepalaKampung}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>

          <div className="flex flex-col   justify-between w-full">
            <label htmlFor="sekretaris" className="ont-semibold">
              SEKRETARIS
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="sekretaris"
              name="sekretaris"
              value={formData.sekretaris}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>

          <div className="flex  flex-col  justify-between w-full">
            <label htmlFor="kasiPemerintahan" className="ont-semibold">
              KASI PEMERINTAHAN
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="kasiPemerintahan"
              name="kasiPemerintahan"
              value={formData.kasiPemerintahan}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="kasiKesejahteraan" className="ont-semibold">
              KASI KESEJAHTERAAN
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="kasiKesejahteraan"
              name="kasiKesejahteraan"
              value={formData.kasiKesejahteraan}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="kasiPelayanan" className="ont-semibold">
              KASI PELAYAN
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="kasiPelayanan"
              name="kasiPelayanan"
              value={formData.kasiPelayanan}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>

          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="kaurTuDanUmum" className="ont-semibold">
              KAUR TU & UMUM
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="kaurTuDanUmum"
              name="kaurTuDanUmum"
              value={formData.kaurTuDanUmum}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="kaurKeuangan" className="ont-semibold">
              KAUR KEUANGAN
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="kaurKeuangan"
              name="kaurKeuangan"
              value={formData.kaurKeuangan}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="kaurPerencanna" className="ont-semibold">
              KAUR PERENCANAAN
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="kaurPerencanna"
              name="kaurPerencanna"
              value={formData.kaurPerencanna}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>

          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="dusunSibej" className="ont-semibold">
              DUSUN SIBEJ
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="dusunSibej"
              name="dusunSibej"
              value={formData.dusunSibej}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>

          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="dusunPeyangau" className="ont-semibold">
              DUSUN BEYANGAU
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="dusunPeyangau"
              name="dusunPeyangau"
              value={formData.dusunPeyangau}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="dusunLohoy" className="ont-semibold">
              DUSUN LOHOY
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="dusunLohoy"
              name="dusunLohoy"
              value={formData.dusunLohoy}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>

          <div className="flex flex-col justify-between w-full">
            <label htmlFor="dusunSiwiMer" className="ont-semibold">
              DUSUN SIWI MER
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="dusunSiwiMer"
              name="dusunSiwiMer"
              value={formData.dusunSiwiMer}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="dusunSaugemes" className="ont-semibold">
              DUSUN SAUGEMES
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="dusunSaugemes"
              name="dusunSaugemes"
              value={formData.dusunSaugemes}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <label htmlFor="siwiGunung" className="ont-semibold">
              SIWI GUNUNG
            </label>
            <input
              type="text"
              disabled={!isEdit}
              id="siwiGunung"
              name="siwiGunung"
              value={formData.siwiGunung}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 mb-4"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading || !isEdit}
            className={`bg-blue-500 disabled:bg-opacity-50 ${
              isEdit ? "cursor-pointer" : "cursor-not-allowed"
            } hover:bg-blue-700 text-white  py-2 px-4 rounded`}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputStruktur;

/* 
MEWUJUDKAN KAMPUNG SIWI YANG BERLANDASKAN IMAN, BERMARTABAT, SEJATERAH DAN TRANSPARANSI */

/* 
1. MENCIPTAKAN MASYARAKAT KAMPUNG SIWI BERLANDASKAN KEIMANAN DAN SOSIAL BUDAYA.
2. MENCIPTAKAN PEMERINTAHAN KAMPUNG SIWI YANG BERSIH DAN BERINTEGRITAS.
3. MENINGKATKAN KUALITAS HIDUP YANG MEMADAI DAN MEMILIKI DAYA SAING.
4. MENINGKATKAN SUMBER DAYA MANUSIA (SDM), SUMBER DAYA ALAM (SDA), DAN SUMBER DAYA LAINNYA.
5. MENINGKATKAN SARANA DAN PRASARANA BAGI MASYARAKAT KAMPUNG SIWI DI SEGALA BIDANG.
*/
