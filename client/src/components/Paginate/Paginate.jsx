import React from "react";
import { useDispatch } from "react-redux";
import { nextPage, prevPage } from "../../Redux/actions";
import styles from "./Paginate.module.css";

const Paginate = ({ cantPages, numPage }) => {
  const dispatch = useDispatch();

  function next() {
    dispatch(nextPage());
  }

  function prev() {
    dispatch(prevPage());
  }

  if (!Number.isInteger(cantPages) || cantPages < 0) {
    return null; // Otra opción sería mostrar un mensaje de error <ErrorMessage message="Error: El número de páginas es inválido." />;
  }

  return (
    <div className={styles.paginationContainer}>
      {numPage > 1 && (
        <button className={styles.pageButton} onClick={prev}>
          PREV
        </button>
      )}

      {[...Array(cantPages)].map((_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === numPage;

        return (
          <div
            key={pageNumber}
            className={`${styles.pageNumber} ${
              isActive ? styles.currentPageNumber : ""
            }`}
          >
            {pageNumber}
          </div>
        );
      })}

      {numPage < cantPages && (
        <button className={styles.pageButton} onClick={next}>
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginate;
