import React from "react";
import { getRecipesById, cleanDetail } from "../../Redux/actions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipesById(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [id]);

  const detailsState = useSelector((state) => state.details);
  console.log(detailsState);
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.titleContainer}>
          <h1>{detailsState.title}</h1>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src={detailsState.image} alt={detailsState.title} />
          </div>
          <div className={styles.stepsContainer}>
            <h3>STEPS:</h3>
            <ul>
              {!isNaN(+detailsState.id) &&
                detailsState?.analyzedInstructions?.map((instruction) => (
                  <li key={instruction.number}>
                    {instruction.number}. {instruction.step}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div>
          <h3>Nivel de Salud: {detailsState.healthScore}</h3>
        </div>
      </div>
      <Link to="/home">
        <button className={styles.btn}>volver a la pagina anterior</button>
      </Link>
    </div>
  );
}
