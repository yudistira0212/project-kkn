import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "./init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export const retrieveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};

export const retrieveDataById = async (collectionName: string, id: string) => {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data;

  return data;
};

// crerate user
export const createUser = async (
  userData: {
    fullName: string;
    email: string;
    password: string;
    role?: string;
  },
  callback: Function
) => {
  await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      setDoc(doc(firestore, "users", user.uid), {
        role: userData.role || "user",
      });
      // Gunakan metode updateProfile untuk mengubah displayName
      updateProfile(user, {
        displayName: userData.fullName,
      });

      callback(true, "user berhasil di buat");
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Tangani kesalahan
      callback(false, errorMessage);
      console.error(errorCode, errorMessage);
    });
};

export const loginUser = async (
  userData: { email: string; password: string },
  callback: Function
) => {
  try {
    // Lakukan proses login dengan Firebase Authentication
    await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    ).then((user) => {
      const email = user.user.email;
      callback(true, email + " berhasil login");
    });
    // Pengguna berhasil login
    console.log("User logged in successfully");
    // return true;
  } catch (error: any) {
    callback(false, error.message);
    console.error("Error during login:", error.message);
    // Login gagal
    throw new Error("Invalid login credentials");
  }
};

export const logoutUser = async () => {
  await auth.signOut();
};

// user check user is login
export const checkUser = async (callback: Function) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        callback(true, user);
      } else {
        callback(false, "anda belum login");
      }
    });
  } catch (error) {
    callback(false, error);
  }
};

// upload image
export const uploadImage = async (
  img: File,
  refImg: String,
  callback: Function
) => {
  try {
    const nameImg = `${Date.now()}_${img.name}`;
    const imgRef = ref(storage, `${refImg}/${nameImg}`);

    // Upload gambar
    await uploadBytes(imgRef, img);

    // Dapatkan URL unduhan gambar
    const url = await getDownloadURL(imgRef);

    // Panggil callback dengan status true dan URL gambar
    callback(true, url);
  } catch (error) {
    // Tangani kesalahan jika terjadi
    console.error("Gagal mengupload gambar:", error);
    callback(false, error + ": Gagal mengupload gambar");
  }
};

//update image
export const updateImage = async (
  namaImage: String,
  refImg: String,
  image: File,
  callback: Function
) => {
  try {
    // Buat referensi untuk gambar yang sudah ada
    const imgRef = ref(storage, `${refImg}/${namaImage}`);

    // Hapus gambar yang sudah ada dari Firebase Storage
    await deleteObject(imgRef);

    // Upload gambar baru
    await uploadBytes(imgRef, image);

    // Dapatkan URL download gambar yang baru diunggah
    const imgUrl = await getDownloadURL(imgRef);

    // Panggil callback dengan status true dan URL gambar baru
    callback(true, imgUrl);
  } catch (error) {
    // Tangani kesalahan jika terjadi
    console.error("Gagal mengupdate gambar:", error);
    callback(false, { error: "Gagal mengupdate gambar" });
  }
};

export const createProfil = async (
  dataBerita: {
    title: string;
    // content: string;
    alamat: string;
    deskripsi: string;
    img: { name: string; url: string };
  },
  callback: Function
) => {
  // Buat referensi ke koleksi "berita" di Firestore
  const beritaCollectionRef = collection(firestore, "profil-kampung");

  // Tambahkan dokumen berita ke Firestore
  const beritaDocRef = await addDoc(beritaCollectionRef, dataBerita)
    .then(() => {
      callback(true, "Data berita berhasil di input");
      // return "Data berita berhasil di input";
    })
    .catch(() => {
      callback(false, "Data berita gagal di input");
    });
};
