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
import { firestore, storage } from "../init";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

export const createGaleri = async (
  dataGaleri: {
    title: string;
    detail: string;
    image: { name: string; url: string };
    createdAt?: string;
  },
  image: File,
  callback: Function
) => {
  const namaImage = `${Date.now()}_${image.name}`;
  const imgRef = ref(storage, `galeri/${namaImage}/`);

  // Upload gambar
  await uploadBytes(imgRef, image);

  // Dapatkan URL unduhan gambar
  const url = await getDownloadURL(imgRef);

  if (url) {
    dataGaleri.image.name = namaImage;
    dataGaleri.image.url = url;
  }
  dataGaleri.createdAt = new Date().toISOString();
  const CollectionRef = collection(firestore, "galeri");

  try {
    await addDoc(CollectionRef, dataGaleri);
    callback(true, "Data galeri berhasil diinput");
  } catch (error: any) {
    callback(false, "Gagal memasukkan data galeri: " + error.message);
  }
};

export const updateGaleri = async (
  id: string,
  dataGaleri: {
    title?: string;
    detail?: string;
    image?: { name: string; url: string };
  },
  callback: Function,
  image?: File
) => {
  const potensiDocRef = doc(firestore, "galeri", id);
  const snapshot = (await getDoc(doc(firestore, "galeri", id))).data();

  if (image !== undefined) {
    const imgName = snapshot?.image.name;
    console.log(imgName);

    const imgRef = ref(storage, `galeri/${imgName}`);
    await uploadBytes(imgRef, image);

    // Dapatkan URL unduhan gambar
    const url = await getDownloadURL(imgRef);

    if (dataGaleri.image) {
      dataGaleri.image.name = imgName;
      dataGaleri.image.url = url;
    }
  }

  try {
    await updateDoc(potensiDocRef, dataGaleri);
    callback(true, "Data galeri berhasil diperbarui");
  } catch (error: any) {
    callback(false, "Gagal memperbarui data galeri: " + error.message);
  }
};

// Fungsi untuk menghapus data galeri galeri
export const deleteGaleri = async (id: string, callback: Function) => {
  const snapshot = (await getDoc(doc(firestore, "galeri", id))).data();

  const potensiDocRef = doc(firestore, "galeri", id);
  const imgName = snapshot?.image?.name;
  const imageRef = ref(storage, `galeri/${imgName}`);

  try {
    await deleteObject(imageRef);
    await deleteDoc(potensiDocRef);
    callback(true, "Data galeri berhasil dihapus");
  } catch (error: any) {
    callback(false, "Gagal menghapus data galeri: " + error.message);
  }
};
