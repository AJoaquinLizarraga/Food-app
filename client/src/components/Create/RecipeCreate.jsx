import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postRecipe, getTypeDiets } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RecipeCreate.module.css";

function controlForm(input) {
  let errors = {};
  const regexHealthScore = /^(100|[1-9]\d|\d)$/;

  if (!input.title) errors.title = "Por favor, coloque un título a su receta";
  if (!input.summary) errors.summary = "Detalle un resumen";
  if (!regexHealthScore.test(input.healthScore))
    errors.healthScore = "Puntúe su healthScore";
  if (!input.image) errors.image = "De preferencia, coloque una foto de su receta"; //modificar
  if (!input.diet || input.diet.length === 0)
    errors.diet =
      "Seleccione al menos 3 tipos de dieta que correspondan";

  return errors;
}

export default function CreateRecipe() {
  const dispatch = useDispatch();

  let listDiets = useSelector((state) => state.typeDiet);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: "",
    stepbystep: "",
    diet: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getTypeDiets());
  }, [dispatch]);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    setErrors(controlForm(input));
  }, [input]);

  function handleSelect(event) {
    setInput({
      ...input,
      diet: [...input.diet, event.target.value],
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // const {
    //   title,
    //   summary,
    //   healthScore,
    //   stepbystep,
    //   typeDiet,
    //   image,
    // } = input;

    const typeDietsAsString = input.diet.join(",");
    try {
       dispatch(
        postRecipe(input)
      );
      alert("Felicitaciones, ha creado su nueva receta");
      setInput({
        title: "",
        summary: "",
        healthScore: "",
        stepbystep: "",
        diet: [],
        image: "",
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  }
  function handleDelete(event) {
    setInput({
      ...input,
      diet: input.diet.filter((diet) => diet !== event),
    });
  }

  return (
    <div className={styles.bkg}>
      <div className={styles.container}>
        <Link to="/home">
          <button className={styles.btn}>Volver al Inicio</button>
        </Link>
        <h1 className={styles.h1}>¡Crea tu propia receta!</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>
          <br />
          <div>
            <label>Resumen:</label>
            <input
              type="text"
              name="summary"
              value={input.summary}
              onChange={handleChange}
            />
            {errors.summary && <p className={styles.error}>{errors.summary}</p>}
          </div>
          <br />
          <div>
            <label>Puntuación de salud:</label>
            <input
              type="number"
              min="0"
              max="100"
              name="healthScore"
              value={input.healthScore}
              onChange={handleChange}
            />
            {errors.healthScore && (
              <p className={styles.error}>{errors.healthScore}</p>
            )}
          </div>
          <br />
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={input.image}
              onChange={handleChange}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}
          </div>
          <br />
          <div>
            <label>Paso a paso:</label>
            <input
              type="text"
              name="stepbystep"
              value={input.stepbystep}
              onChange={handleChange}
            />
          </div>
          <br />
          <select onChange={handleSelect} className={styles.select}>
            {listDiets?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>


          <br />
          {input.diet.map((event) => {
            return (
              <div key={event}>
                <h5 className={styles.types}>{event}</h5>
                <button className={styles.btnx} onClick={() => handleDelete(event)}>
                  Eliminar
                </button>
              </div>
              
            );
          })}
          {errors.title ||
          errors.summary ||
          errors.healthScore ||
          errors.image ||
          errors.typeDiet ? (
            <p className={styles.adv}>
              Por favor, complete todas las entradas requeridas para crear su receta.
            </p>
          ) : (
            <button type="submit" className={styles.correct}>
              Create Recipe
            </button>
          )}
        </form>
        <br />
      </div>
    </div>
  );
}
