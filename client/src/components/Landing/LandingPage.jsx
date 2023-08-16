import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const history = useNavigate();
  /* AQUI INTENTE CON EL HOOK usoHistory de react-router-dom */

  const handleButtonClick = () => {
    history("/home");
  };

  return (
    <div className={styles.landing}>
      <h1 className={styles.bienvenido}>Bienvenido</h1>
      <div className={styles.background} onClick={handleButtonClick}>
        <button className={styles.button}>🔎</button>
      </div>
    </div>
  );
}
