"use client";
import React, { useState } from "react";

import InputPotensi from "./input";
import TablePotensi from "./tablePotensi";

const PagePotensi = () => {
  return (
    <div>
      <div className="flex justify-between mx-5 items-center py-2">
        <h1 className="text-2xl font-bold">Potensi</h1>
        <InputPotensi onSuccess={() => window.location.reload()} />
      </div>
      <div>
        <TablePotensi />
      </div>
    </div>
  );
};

export default PagePotensi;
