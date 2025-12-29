import React from "react";

type PaginationProps = {
  pageNumber: number;
  pageSize: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({
  pageNumber,
  pageSize,
  total,
  onPrev,
  onNext,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "10px",
      }}
    >
      <span>
        Page {pageNumber} of {totalPages || 1}
      </span>
      <button onClick={onPrev} disabled={pageNumber <= 1}>
        Previous
      </button>
      <button onClick={onNext} disabled={pageNumber >= totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
