"use client";

import "chart.js/auto";
import DataPenduduk from "../components/data-penduduk/DataPenduduk";
import Navbar from "../components/header/Navbar";
import Footer from "../components/footer/Footer";

function DataPendudukk() {
  return (
    <div>
      <Navbar />

      <DataPenduduk />

      <Footer />
    </div>
  );
}

export default DataPendudukk;
