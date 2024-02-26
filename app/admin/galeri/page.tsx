"use client";
import React from "react";
import InputGaleri from "./inputGaleri";
import TableGaleri from "./tableGaleri";

const PageGaleri = () => {
  return (
    <div>
      <div className="flex justify-between mx-5 items-center py-2">
        <h1 className="text-2xl font-bold">Galeri</h1>
        <InputGaleri onSuccess={() => window.location.reload()} />
      </div>

      <div className="p-2">
        <TableGaleri />
      </div>
    </div>
  );
};

export default PageGaleri;
