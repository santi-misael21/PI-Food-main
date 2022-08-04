import { useDispatch, useSelector } from "react-redux"
import { filtrordenadas } from "../redux/actions"
import React from "react"


function Search(recetaslocal){

    const recetasordenadas= useSelector(state=> state.ordered)

    function typing(e){
        if(e.target.value==""){
            if(recetasordenadas.length){
                dispatch(filtrordenadas(recetasordenadas))
            }
            else dispatch(filtrordenadas(recetaslocal))
        }
        if(e.target.value!=""){
            if(recetasordenadas.length){//de Redux, asignacion nuestra
                let filtro= recetasordenadas.filter((r)=> r.Nombre.includes(e.target.value))
                dispatch(filtrordenadas(filtro))//action de redux //array de filter vacio!
            }
            else if(recetasordenadas.length== 0){
                let filtro= recetaslocal.filter((r)=>r.Nombre.includes(e.target.value))
                dispatch(filtrordenadas(filtro))//puede quedar vacio //si pasa render siguiente
            }
        }

    }
}