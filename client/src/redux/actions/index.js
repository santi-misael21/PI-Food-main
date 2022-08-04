import axios from 'axios'; 

export const GET_RECIPES= "GET_RECIPES";
export const ORDERED= "ORDERED";
export const DETAIL= "DETAIL";
export const CREATE= "CREATE";
export const PAGING= "PAGING";
export const GET_DIETS= "GET_DIETS";
export const FILTRORDENADAS= "FILTRORDENADAS";
export const BINARIA= "BINARIA";
export const TYPING= "TYPING";
export const SEÑALADOR="SEÑALADOR";
export const CREATEDISPLAY= "CREATEDISPLAY";
export const GET_FUELS= "GET_FUELS";

export const create = (valores)=> {
    return{
        type: CREATE,
        payload: {...valores}
    }
}

export const createdisplay = (objeto)=> {
    return{
        type: CREATEDISPLAY,
        payload: objeto
    }
}

export const ordered= (arrayordered)=> {
    return {
        type: ORDERED,
        payload: [...arrayordered]
    }
}

export const filtrordenadas= (arrayfiltrordenado)=> {
    return {
        type:FILTRORDENADAS,
        payload: [...arrayfiltrordenado]
    }
}

export const binaria= (bool)=> {
    return {
        type: BINARIA,
        payload: bool
    }
}

export const getfuels = ()=> {
    return async function(dispatch){
        axios.get(`http://localhost:3001/recipes/table`
        ).then(r=> r
        ).then(r=> dispatch({type: GET_FUELS, payload: r})
        ).catch(e=> console.log(e))
    }
}

export const getRecipes= ()=> {
    return async function (dispatch){
        axios.get("http://localhost:3001/recipes"
        ).then(r => r.data
        // ).then(r=> console.log(r)
        ).then(r=> dispatch({type: GET_RECIPES, payload: r})
        ).catch(e=>console.log(e))
    } 
}

export const detail= (id)=> {
    return async function (dispatch){
        await axios.get(
            `http://localhost:3001/recipes/${id}`
        ).then(r=> r.data
        ).then(r=> dispatch({ type: DETAIL, payload: r}) 
        ).catch(e=>console.log(e))
    }
}

export const paging= (valores)=> {
    return{
        type: PAGING,
        payload: valores //va a ser un arreglo modulado [[{}, {}, {}], [{}, {}, {}]]
    }
}

export const getDiets= ()=>{
    return async function (dispatch){
        axios.get("http://localhost:3001/diets"
        ).then(r => r.data
        ).then(r=> dispatch({type: GET_DIETS, payload: r})
        ).catch(e=>console.log(e))
    } 
}

export const tipear= (value)=> {
    return {
        type: TYPING,
        payload: value
    }
}

export const savepage= (page)=>{
    return{
        type: SEÑALADOR,
        payload: page
    }
}