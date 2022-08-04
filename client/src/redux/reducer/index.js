import {
    GET_RECIPES,
    DETAIL,
    CREATE,
    PAGING,
    GET_DIETS,
    ORDERED,
    FILTRORDENADAS,
    TYPING,
    SEÑALADOR,
    CREATEDISPLAY,
    GET_FUELS
   } from '../actions/index.js'


const initialState= {
    recipes: [], //respuesta en bruto
    ordered: [],
    filterorder: [],
    paging: [], //los modulados entrarán de nuestro propio código Paginador.js
    recipeDetail: {},
    reciencreada: {},//PARA PREVALECER CON REDUX
    creadas: [],//PARA PREVALECER CON REDUX
    diets: [],
    input: "",
    page: 0,
    dataFuels: ""
}//Acá, paging y recipes son independientes. En términos de datos tienen la misma información.
//Recipes, es un array en bruto con todos los objetos-receta.
//Paging, es un array que tiene sub-arrays, cada uno de estos sub-arrays representa una página
//Recipes: Array(27) [] 
//Paging: Array(3) [Array(9)[], Array(9)[], Array(9)[]]

const rootReducer = (state= initialState, action)=>{
    switch (action.type) {
        case CREATEDISPLAY:
            return{
                ...state,
                creadas: [...state.creadas, action.payload]
            };
        case GET_FUELS:
            return{
                ...state,
                dataFuels: action.payload
            };
        case GET_RECIPES:
            // if(state.creadas.length){
            //     return{
            //         ...state,
            //         recipes: [...action.payload, ...state.creadas]
            //     }
            // }
            // if(state.recipes[state.recipes.length])
            return{
                ...state,
                recipes:  action.payload //solo action.payload?
            };
        case ORDERED:
            return{
                ...state,
                ordered: action.payload
            };
        case FILTRORDENADAS:
            return{
                ...state,
                filterorder: action.payload
            };
        case DETAIL:
            return {
                ...state,
                recipeDetail: action.payload //Solo el objeto
            };
        case CREATE:
            // console.log("desde reducer", state)
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case PAGING:
            return{
                ...state,
                paging: action.payload //paging es un actualizable 
            };
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload //array actualizable
            };
        case TYPING:
            return{
                ...state,
                input: action.payload
            };
        case SEÑALADOR:
            return{
                ...state,
                page: action.payload
            };
            default:
            return state
    }
}

export default rootReducer;