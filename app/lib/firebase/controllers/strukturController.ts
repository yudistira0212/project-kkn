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
import app from "./../init";

const firestore = getFirestore(app);

export const struktur = async (
  dataStruktur: {
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
  },
  callback: Function
) => {
  // Buat referensi ke koleksi "dataKampung" di Firestore
  const dataKampungCollectionRef = collection(firestore, "dataKampung");

  try {
    // Buat referensi ke dokumen "profil" di dalam koleksi "dataKampung"
    const profilDocRef = doc(dataKampungCollectionRef, "dataStruktur");

    // Tambahkan dokumen profil ke dalam koleksi "dataKampung/profil" di Firestore
    await setDoc(profilDocRef, dataStruktur);
    callback(true, "Data strukur berhasil di input");
  } catch (error: any) {
    callback(false, "Gagal memasukkan data strukur: " + error.message);
  }
};
