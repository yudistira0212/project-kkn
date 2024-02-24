"use client";
import React, { useState } from "react";

import InputPotensi from "./input";
import TablePotensi from "./tablePotensi";

const PagePotensi = () => {
  return (
    <div>
      <InputPotensi onSuccess={() => window.location.reload()} />
      <div>
        <TablePotensi />
      </div>
    </div>
  );
};

export default PagePotensi;
