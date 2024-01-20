// components/Pagination.js
import React from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const PaginationBlock = ({ totalItems, limit, currentPage, onPageChange, onItemsPerPageChange }) => {
  const totalPages = Math.ceil(totalItems / limit);
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    onItemsPerPageChange(newItemsPerPage);
  };

  return (
    <div className="flex items-center my-2 px-5">
      <div className="ml-4 flex-1">
        <label className="mr-2">Items per Page:</label>
        <select
          value={limit}
          onChange={handleItemsPerPageChange}
          className="border rounded-md px-2 py-1 bg-gray-700 "
        >
          {[5, 10, 15, 20].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>



      <div className=' '> <span className="mx-2">
        Showing {startItem} to {endItem} of {totalItems}
      </span>

        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span></div>
      <div className='flex gap-2'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="ml-2  rounded-full  bg-transparent hover:bg-gray-700  disabled:text-gray-500 text-black disabled:bg-gray-50 flex gap-2 items-center"
        >
          <FaArrowAltCircleLeft className='w-6 h-6' /> 
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2   rounded-full  bg-transparent hover:bg-gray-700 disabled:text-gray-500 text-black disabled:bg-gray-50 flex gap-2 items-center"
        >
          <FaArrowAltCircleRight className='w-6 h-6' />
        </button>
      </div>

    </div>
  );
};

export default PaginationBlock;
