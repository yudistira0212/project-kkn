import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../init";

export const Penduduk = async (
  dataPenduduk: {
    laki: string;
    totalPenduduk: string;
    perempuan: string;
    keluarga: string;
    deskripsi: string;
  },
  callback: Function
) => {
  // Buat referensi ke koleksi "dataKampung" di Firestore
  const dataKampungCollectionRef = collection(firestore, "dataKampung");

  try {
    // Buat referensi ke dokumen "profil" di dalam koleksi "dataKampung"
    const profilDocRef = doc(dataKampungCollectionRef, "dataPenduduk");

    // Tambahkan dokumen profil ke dalam koleksi "dataKampung/profil" di Firestore
    await setDoc(profilDocRef, dataPenduduk);
    callback(true, "Data profil berhasil diinput");
  } catch (error: any) {
    callback(false, "Gagal memasukkan data profil: " + error.message);
  }
};
