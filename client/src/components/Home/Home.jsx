import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  filterRecipesByTypeDiet,
  orderByName,
  orderBySource,
  orderByPuntuation,
  getRecipesByName,
  handleNumber,
  getTypeDiets,
  prevPage,
  nextPage,
} from "../../Redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import styles from "./Home.module.css";
export default function Home() {
  const dispatch = useDispatch();
  const { recipes, typeDiet, numPage } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [typeDietFilter, setTypeDietFilter] = useState("All");

  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const start = (numPage - 1) * recipesPerPage;
  const end = start + recipesPerPage;

  let viewRecipes = [];

  if (Array.isArray(recipes) && recipes.length > 0) {
    viewRecipes = recipes.slice(start, end);
  } else {
    viewRecipes = [];
  }
  const handleRefresh = () => {
    window.location.reload();
  };
  // useEffect(() => {
  //   dispatch(getRecipes());
  //   dispatch(getTypeDiets());
  // }, [dispatch]);

  const handleFilterTypeDiet = (event) => {
    setTypeDietFilter(event.target.value);
    dispatch(filterRecipesByTypeDiet(event.target.value));
    dispatch(handleNumber(1));
  };

  const handleOrderByName = (order) => {
    setOrder(order);
    dispatch(orderByName(order));
    dispatch(handleNumber(1));
  };

  const handlePuntuation = (event) => {
    setOrder(event.target.value);
    dispatch(orderByPuntuation(event.target.value));
    dispatch(handleNumber(1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getRecipesByName(search));
    setSearch("");
  };

  const handleInputName = (event) => {
    setSearch(event.target.value);
  };

  const handleFromApi = (event) => {
    dispatch(orderBySource(event.target.value));
    dispatch(handleNumber(1));
  };
  return (
    <div className={styles.container}>
      <div id={styles.navBar} className={styles.navBarContainer}>
        <div className={styles.refreshContainer} onClick={handleRefresh} />

        <div className={styles.search}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="¿buscamos recetas?"
              value={search}
              onChange={handleInputName}
              className={styles.input}
            />
            <button type="submit" className={styles.btnsearch}>
              Buscar
            </button>
          </form>
        </div>

        <div className={styles.filterC}>
          <Link to="/recipe">
            <button className={styles.button}>Crear Receta</button>
          </Link>

            <button
              className={styles.Az}
              onClick={() => handleOrderByName("asc")}
              disabled={order === "asc"}
            >
              A-Z
            </button>
            <button
              className={styles.Az}
              onClick={() => handleOrderByName("des")}
              disabled={order === "des"}
            >
              Z-A
            </button>

          <div>
            <select className={styles.filterrecipe} onChange={handleFromApi}>
              <option value="ALL">ALL RECIPES</option>
              <option value="API">FROM API</option>
              <option value="BDD">FROM DATABASE</option>
            </select>
          </div>

          <div>
            <select
              className={styles.mayormenor}
              onChange={handlePuntuation}
              value={order}
            >
              <option value="mayormenor">mayor a menor puntaje de salud</option>
              <option value="menormayor">menor a mayor puntaje de salud</option>
            </select>
          </div>

          <div>
            <select
              className={styles.allrecipes}
              onChange={handleFilterTypeDiet}
              value={typeDietFilter}
            >
              <option value="All">Todas las recetas</option>
              {typeDiet.map((typeDiet) => (
                <option key={typeDiet.name} value={typeDiet.name}>
                  {typeDiet.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Paginate cantPages={totalPages} numPage={numPage} />

      {viewRecipes.length > 0 ? (
        <div className={styles.cards}>
          {viewRecipes.map((recipe) => (
            <Link to={"/recipes/" + recipe.id} key={recipe.id}>
              <Card
                title={recipe.title}
                image={recipe.image}
                TypeDiets={recipe.TypeDiets}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.noRecipes}>
          <h1> No hay recetas disponibles.</h1>
        </div>
      )}
    </div>
  );
}
