import React from 'react';
import Styles from './pagination.module.css';

function Pagination({
    currentPage,
    onPageChange,
    totalItemsCount,
    itemsPerPage,
}) {
    // Calculate total pages (Range)
    const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

    // Visible Page Numbers
    let visiblePageNumbers = [];

    // Logic for inserting the visible page numbers in the Array
    if (currentPage <= 3) {
        visiblePageNumbers = [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
        visiblePageNumbers = [
            1,
            '...',
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    } else {
        visiblePageNumbers = [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages,
        ];
    }

    // Handle Page Click
    const handlePageClick = (page) => {
        if (page !== '...') {
            onPageChange(page);
        }
    };

    // Handle Previous Page Button
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // Handle Next Page Button
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Handle ellipsis click
    const handleEllipsisClick = (index) => {
        const ellipsisIndex = index;
        const currentPageIndex = visiblePageNumbers.indexOf(currentPage);

        if (currentPageIndex > ellipsisIndex) {
            onPageChange(Math.max(currentPage - 3, 1));
        } else if (currentPageIndex < ellipsisIndex) {
            onPageChange(Math.min(currentPage + 3, totalPages));
        } else {
            return false;
        }
    };

    // Dynamic Styling
    const prevStyle = `${Styles.btn} ${currentPage === 1 ? Styles.hidden : ''}`;
    const nextStyle = `${Styles.btn} ${
        currentPage === totalPages ? Styles.hidden : ''
    }`;

    return (
        <>
            <div className={Styles.pagination}>
                <button onClick={handlePreviousPage} className={prevStyle}>
                    <strong className={Styles.strong}>&lt;</strong>
                </button>

                {visiblePageNumbers.map((page, index) => (
                    <button
                        key={index}
                        className={`${Styles.btn} ${
                            page === currentPage ? Styles.active : ''
                        }`}
                        onClick={() =>
                            page === '...'
                                ? handleEllipsisClick(index)
                                : handlePageClick(page)
                        }
                        disabled={page === currentPage}
                    >
                        {page === '...' ? (
                            <span className={Styles.span}>{page}</span>
                        ) : (
                            page
                        )}
                    </button>
                ))}

                <button onClick={handleNextPage} className={nextStyle}>
                    <strong className={Styles.strong}>&gt;</strong>
                </button>
            </div>

            <p className={Styles.label}>
                [ Page {currentPage} of {totalPages} ]
            </p>
        </>
    );
}

export default Pagination;
