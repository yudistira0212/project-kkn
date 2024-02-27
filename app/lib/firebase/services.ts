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
  const data = snapshot.data(); // Panggil .data() untuk mendapatkan data

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
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((user) => {
        if (user) {
          // const email = user.user.email;
          callback(true, user.user.email + " berhasil login");
        }
      })
      .catch((error) => {
        callback(false, error.message);
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
export const checkUser = async () => {
  return new Promise((resolve, reject) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("check", { user });
          resolve(true); // Kembalikan true jika pengguna terautentikasi
        } else {
          console.log("gagal", { user });
          resolve(false); // Kembalikan false jika pengguna tidak terautentikasi
        }
      });
    } catch (error) {
      reject(error);
    }
  });
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
  dataProfil: {
    title: string;
    alamat: string;
    deskripsi: string;
    email: string;
    telephone: string;
    image: { name: string; url: string };
  },
  callback: Function,
  img?: File
) => {
  if (img) {
    const imgRef = ref(storage, `image/profilKampung`);

    // Upload gambar
    await uploadBytes(imgRef, img);

    // Dapatkan URL unduhan gambar
    const url = await getDownloadURL(imgRef);
    if (url) {
      dataProfil.image.name = img.name;
      dataProfil.image.url = url;
    }
  }

  // Buat referensi ke koleksi "dataKampung" di Firestore
  const dataKampungCollectionRef = collection(firestore, "dataKampung");

  try {
    // Buat referensi ke dokumen "profil" di dalam koleksi "dataKampung"
    const profilDocRef = doc(dataKampungCollectionRef, "profil");

    // Tambahkan dokumen profil ke dalam koleksi "dataKampung/profil" di Firestore
    await setDoc(profilDocRef, dataProfil);
    callback(true, "Data profil berhasil diinput");
  } catch (error: any) {
    callback(false, "Gagal memasukkan data profil: " + error.message);
  }
};
