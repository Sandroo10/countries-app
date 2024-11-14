import React from 'react';
import styles from './Pagination.module.css'; 

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number; 
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, totalPages }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button 
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={styles.arrowButton}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
      >
        Next
      </button>
    </div>
  );
};


export default Pagination;
