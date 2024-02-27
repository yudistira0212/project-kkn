"use client";

import DataGaleri from "../components/data-galeri/DataGaleri";
import Navbar from "../components/header/Navbar";
import Footer from "../components/footer/Footer";

function Galeri() {
  return (
    <div className="bg-[#0B3147]">
      <Navbar />

      <DataGaleri />

      <Footer />
    </div>
  );
}

export default Galeri;
