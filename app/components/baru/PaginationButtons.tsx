"use client";
import React from "react";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) => (
  <div className="text-center my-2">
    <button
      className="border p-2 bg-white text-black  rounded w-[40px] "
      onClick={onPrevPage}
      disabled={currentPage === 1}
    >
      {"<"}
    </button>
    <span className="px-2 text-white">
      Page {currentPage} of {totalPages}
    </span>
    <button
      className="border p-2 bg-white text-black rounded w-[40px]"
      onClick={onNextPage}
      disabled={currentPage === totalPages}
    >
      {">"}
    </button>
  </div>
);

export default PaginationButtons;
