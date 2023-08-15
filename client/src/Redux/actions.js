import axios from "axios";

export const POST_RECIPE = "POST_RECIPE";

export const GET_RECIPES = "GET_RECIPES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const GET_TYPE_DIETS = "GET_TYPE_DIETS";

export const CLEAN_DETAIL = "CLEAN_DETAIL";

export const FILTER_BY_TYPEDIET = "FILTER_BY_TYPEDIET";
export const ORDER_BY_SOURCE = "ORDER_BY_SOURCE";

export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_PUNTUATION = "ORDER_BY_PUNTUATION";

export const RESET_RECIPES_SEARCHED = "RESET_RECIPES_SEARCHED";
export const RESET_RECIPES = "RESET_RECIPES";

export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const HANDLE_NUMBER = "HANDLE_NUMBER";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/recipes`);
    return dispatch({
      type: GET_RECIPES,
      payload: json.data,
    });
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    return dispatch({
      type: GET_BY_NAME,
      payload: json.data,
    });
  };
}

export function getRecipesById(id) {
  return async function (dispatch) {
    const { data } = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: GET_BY_ID,
      payload: data,
    });
  };
}

export function getTypeDiets() {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/types`);
    return dispatch({
      type: GET_TYPE_DIETS,
      payload: json.data,
    });
  };
}

export const postRecipe = (recipeData) => {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3001/recipes",
      recipeData
    );
    return dispatch({
      type: POST_RECIPE,
      payload: response.status,
    });
  };
};

export function filterRecipesByTypeDiet(payload) {
  return {
    type: FILTER_BY_TYPEDIET,
    payload,
  };
}

export function orderBySource(source) {
  return {
    type: ORDER_BY_SOURCE,
    payload: source,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function cleanDetail(payload) {
  return {
    type: CLEAN_DETAIL,
    payload,
  };
}

export function orderByPuntuation(order) {
  return {
    type: ORDER_BY_PUNTUATION,
    payload: order,
  };
}

export function resetRecipes() {
  return {
    type: RESET_RECIPES,
  };
}

export function resetRecipesSearched() {
  return {
    type: RESET_RECIPES_SEARCHED,
  };
}

export function prevPage() {
  return {
    type: PREV_PAGE,
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE,
  };
}

export function handleNumber(num) {
  return {
    type: HANDLE_NUMBER,
    payload: num,
  };
}
