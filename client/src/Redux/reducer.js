const initialState = {
  allRecipes: [],
  recipes: [],
  typeDiets: [],
  details: {},
  searchedRecipes: [],
  numPage: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        details: action.payload,
      };

    case "CLEAN_DETAIL":
      return {
        ...state,
        details: {},
      };

    case "GET_TYPE_DIETS":
      return {
        ...state,
        typeDiets: action.payload,
      };

    case "POST_RECIPE":
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };
    case "FILTER_BY_TYPEDIET":
      const { allRecipes } = state;
      const typeDietFilter =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((t) =>
              t.TypeDiets.find((e) => e.name === action.payload)
            );

      return {
        ...state,
        recipes: typeDietFilter,
        allRecipes: state.allRecipes,
      };
    case "ORDER_BY_SOURCE":
      const stateCopy = [...state.allRecipes];
      const fromApi = stateCopy.filter((recipe) => !isNaN(+recipe.id));
      const fromBDD = stateCopy.filter((recipe) => isNaN(+recipe.id));
      return {
        ...state,
        recipes:
          action.payload === "API"
            ? fromApi
            : action.payload === "BDD"
            ? fromBDD
            : stateCopy,
      };

    case "ORDER_BY_NAME":
      const sortedRecipes = state.recipes.slice().sort(function (a, b) {
        if (action.payload === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }
      });
      return {
        ...state,
        recipes: sortedRecipes,
      };

    case "ORDER_BY_PUNTUATION":
      let orderpunt =
        action.payload === "menormayor"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderpunt,
      };

    case "RESET_RECIPES":
      return {
        ...state,
        recipes: [...state.allRecipes],
        searchedRecipes: [],
      };

    case "RESET_RECIPES_SEARCHED":
      return {
        ...state,
        recipes: [...state.searchedRecipes],
      };

    case "HANDLE_NUMBER":
      return {
        ...state,
        numPage: action.payload,
      };

    case "NEXT_PAGE":
      return {
        ...state,
        numPage: state.numPage + 1,
      };

    case "PREV_PAGE":
      return {
        ...state,
        numPage: state.numPage - 1,
      };

    default:
      return state;
  }
}

export default rootReducer;
