import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import app from "./../init";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export const createPotensi = async (
  dataProfil: {
    nama: string;
    deskripsi: string;
    image: { name: string; url: string };
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
    dataProfil.image.name = img.name;
    dataProfil.image.url = url;
  }

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
    nama?: string | any;
    deskripsi?: string;
    image?: { name: string; url: string } | any;
  },
  callback: Function,
  img?: File
) => {
  const potensiDocRef = doc(firestore, "potensi", potensiId);
  const snapshot = (await getDoc(doc(firestore, "potensi", potensiId))).data();

  if (img) {
    const imgName = snapshot?.image?.name;
    const imgRef = ref(storage, `potensi/${imgName}`);
    await uploadBytes(imgRef, img);

    // Dapatkan URL unduhan gambar
    const url = await getDownloadURL(imgRef);

    if (url) {
      newData.image.name = img.name;
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
