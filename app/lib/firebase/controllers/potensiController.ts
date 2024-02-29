import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../init";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const createPotensi = async (
  dataProfil: {
    nama: string;
    deskripsi: string;
    image: { name: string; url: string };
    createdAt?: string;
  },
  img: File,
  callback: Function
) => {
  const namaImage = `${Date.now()}_${img.name}`;
  const imgRef = ref(storage, `potensi/${namaImage}/`);

  // Upload gambar
  await uploadBytes(imgRef, img);

  // Dapatkan URL unduhan gambar
  const url = await getDownloadURL(imgRef);

  if (url) {
    dataProfil.image.name = namaImage;
    dataProfil.image.url = url;
  }

  dataProfil.createdAt = new Date().toISOString();
  const CollectionRef = collection(firestore, "potensi");

  try {
    await addDoc(CollectionRef, dataProfil);
    callback(true, "Data profil berhasil diinput");
  } catch (error: any) {
    callback(false, "Gagal memasukkan data profil: " + error.message);
  }
};

// Fungsi untuk mengupdate data profil potensi
export const updatePotensi = async (
  potensiId: string,
  newData: {
    nama?: string;
    deskripsi?: string;
    image?: { name: string; url: string };
  },
  callback: Function,
  img?: File
) => {
  const potensiDocRef = doc(firestore, "potensi", potensiId);
  const snapshot = (await getDoc(doc(firestore, "potensi", potensiId))).data();

  if (img !== undefined) {
    console.log("masuk ke image");

    const imgName = snapshot?.image.name;
    console.log(imgName);

    const imgRef = ref(storage, `potensi/${imgName}`);
    await uploadBytes(imgRef, img);

    // Dapatkan URL unduhan gambar
    const url = await getDownloadURL(imgRef);

    if (newData.image) {
      newData.image.name = imgName;
      newData.image.url = url;
    }
  }

  try {
    await updateDoc(potensiDocRef, newData);
    callback(true, "Data profil berhasil diperbarui");
  } catch (error: any) {
    callback(false, "Gagal memperbarui data profil: " + error.message);
  }
};

// Fungsi untuk menghapus data profil potensi
export const deletePotensi = async (potensiId: string, callback: Function) => {
  const snapshot = (await getDoc(doc(firestore, "potensi", potensiId))).data();

  const potensiDocRef = doc(firestore, "potensi", potensiId);
  const imgName = snapshot?.image?.name;
  const imageRef = ref(storage, `potensi/${imgName}`);

  try {
    await deleteObject(imageRef);
    await deleteDoc(potensiDocRef);
    callback(true, "Data profil berhasil dihapus");
  } catch (error: any) {
    callback(false, "Gagal menghapus data profil: " + error.message);
  }
};
