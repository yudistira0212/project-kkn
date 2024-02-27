import { checkUser, logoutUser } from "@/app/lib/firebase/services";
import { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [email, setEmail] = useState<string | null>("");
  const [userName, setUserName] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    console.log("Tampilkan profil");
    setLoading(true);
    // Tambahkan logika navigasi disini
    setLoading(false);
  };

  const handleSidebarToggle = () => {
    setLoading(true);
    setIsSidebarOpen(!isSidebarOpen);
    setLoading(false);
  };

  // useEffect(() => {
  //   check();
  // }, []);

  const logOut = async () => {
    try {
      await logoutUser();
      push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const check = async () => {
    await checkUser((success: boolean, user: User) => {
      if (success) {
        // console.log(message);
        setEmail(user.email);
        setUserName(user.displayName);
      } else {
        push("/login");
      }
    });
  };

  return (
    <div>
      <nav className="bg-slate-600 h-16 flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <div className="flex items-center gap-4">
          <div>
            <Link href="/">
              <p className="text-white font-bold text-lg">Dashboard admin</p>
            </Link>
          </div>
          {/* <div className="hidden md:flex gap-6">
            <Link href="#">
              <p className="text-white hover:text-gray-300">Tentang</p>
            </Link>
            <Link href="#">
              <p className="text-white hover:text-gray-300">Layanan</p>
            </Link>
            <Link href="#">
              <p className="text-white hover:text-gray-300">Kontak</p>
            </Link>
          </div> */}
        </div>
        {/* <div className="relative">
          <div className="flex items-center">
            <div className="mr-3 flex items-center justify-center gap-2">
              <h4>{userName}</h4>
              <Image
                src="/app/images/gaul.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                <div className=" py-3 text-center">
                  <h4>{email}</h4>
                </div>
                <button
                  onClick={handleProfileClick}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Lihat Profil
                </button>
                <button
                  onClick={logOut}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div> */}
        <button
          onClick={logOut}
          className="block rounded-sm  px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900"
        >
          Logout
        </button>
        {/* <button onClick={handleSidebarToggle} className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M13.293 5.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className="absolute inset-0 bg-blue-600 opacity-75 z-10"
          style={{
            width: loading ? "100%" : "0%",
            transition: "width 0.5s ease",
          }}
        ></div> */}
      </nav>
    </div>
  );
};

export default Navbar;
