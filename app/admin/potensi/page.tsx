"use client";
import React, { useState } from "react";

import InputPotensi from "./input";
import TablePotensi from "./tablePotensi";

const PagePotensi = () => {
  return (
    <div>
      <div className="flex justify-between  items-center ">
        <h1 className="text-2xl font-bold">Potensi</h1>
        <InputPotensi onSuccess={() => window.location.reload()} />
      </div>
      <div className="mt-2">
        <TablePotensi />
      </div>
    </div>
  );
};

export default PagePotensi;
