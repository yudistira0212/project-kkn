"use client";

import "reactflow/dist/style.css";
import StrukturPemerintahan from "../components/struktur-pemerintahan/StrukturPemerintahan";
import Navbar from "../components/header/Navbar";
import Footer from "../components/footer/Footer";

function StrukturOrganisasi() {
  return (
    <div>
      <Navbar />
      <StrukturPemerintahan />
      <Footer />
    </div>
  );
}

export default StrukturOrganisasi;
