import React from "react";
import styles from "./Card.module.css";

export default function Card({ title, image, TypeDiets, id }) {
  return (
    <div className={styles.cardsContainer}> 
      <div key={id} className={styles.card}>
        <div className={styles.cd}>
          <h3>{title}</h3>
          <img className={styles.cardImg} src={image} alt={title} />
          <div className={styles.tipes}>
            {TypeDiets && TypeDiets.length > 0 && (
              <>
                <h5>Diets: {TypeDiets[0].name}</h5>
                {TypeDiets.length > 1 && (
                  <h5>Diets: {TypeDiets[1].name}</h5>
                )}
                {TypeDiets.length > 2 && (
                  <h5>
                    <span className={styles.showMore}>Click para mostrar más</span>
                  </h5>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
