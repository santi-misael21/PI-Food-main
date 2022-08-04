import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtrordenadas, getDiets, ordered, tipear } from "../redux/actions";
import { Ascensora, Descensora, Filter, Numérica, Reversiva } from "./+0-Searchmodulador";
import '../App.css';
import '../estilos/0-Area/area.css';
import Area from "./-1-AreaSearching";
import Paginador from "./0-Paginador";

export default function Search({recetaslocal, long}){

    let recetasordenadas= useSelector(state=> state.ordered)
    let ordenfiltradas= useSelector(state=> state.filterorder)
    let reduxinput= useSelector(state=> state.input)

    function a(){
        if(!dietas.length){
            dispatch(getDiets())
        }
    }

    useEffect(()=> a())

    let dietas= useSelector(state=> state.diets)

    const dispatch= useDispatch()
    

    function asc(){
        // setNegadores({
        //     ...negadores,
        //     default: false,
        //     ascen: true,
        //     descen: false,
        // }) 
        let toBeOrdered
        if (ordenfiltradas.length){
            toBeOrdered= ordenfiltradas
        }
        else if(ordenfiltradas.length=== 0){
            toBeOrdered= recetaslocal
        }

        Ascensora(toBeOrdered)//AHOTA VA A ESTAR MODIFICADA PARA QUE AL ONCHANGE SE TOME EL ARREGLO CAMBIADO
        if(ordenfiltradas.length){
            dispatch(filtrordenadas(toBeOrdered))//DESPACHAMOS UN ORDEN A FILTRADAS PARA HACERLO ESCUCHAR
        }
        else if(!ordenfiltradas.length){
            dispatch(ordered(toBeOrdered))//DESPACHAMOS SOLO SI NO ESTÁ LLENO, EN ESTE CASO NO LUCHAMOS CONTRA LA PRIORIDAD SETEADA DE FILTRORDERED O COMO SEA
        }
        // dispatch(ordered(recetaslocal))
        // dispatch(binaria(false))
        // setLocal({
        //     ...local,
        //     objetos: [...recetaslocal]
        // })
    }
    function desc(){
        // setNegadores({
        //     ...negadores,
        //     default: false,
        //     ascen: false,
        //     descen: true,
        // })
        let toBeOrdered
        if(ordenfiltradas.length){
            toBeOrdered= ordenfiltradas
        }
        else if(ordenfiltradas.length=== 0){
            toBeOrdered= recetaslocal
        }
        Descensora(toBeOrdered)
        if(ordenfiltradas.length){
            dispatch(filtrordenadas(toBeOrdered))//DESPACHAMOS UN ORDEN A FILTRADAS PARA HACERLO ESCUCHAR
        }
        else if(!ordenfiltradas.length){
            dispatch(ordered(toBeOrdered))//DESPACHAMOS SOLO SI NO ESTÁ LLENO, EN ESTE CASO NO LUCHAMOS CONTRA LA PRIORIDAD SETEADA DE FILTRORDERED O COMO SEA
        }
        // dispatch(ordered(recetaslocal))
        // dispatch(binaria(false))
        // setLocal({
        //     ...local,
        //     objetos: [...recetaslocal]
        // })
    }
    function numer(){
        // setNegadores({
        //     ...negadores,
        //     nombre: false,
        //     health: true,
        //     default: false
        // })
        let toBeOrdered
        if(ordenfiltradas.length){
            toBeOrdered= ordenfiltradas
        }
        else if(ordenfiltradas.length=== 0){
            toBeOrdered= recetaslocal
        }
        Numérica(toBeOrdered)
        if(ordenfiltradas.length){
            dispatch(filtrordenadas(toBeOrdered))//DESPACHAMOS UN ORDEN A FILTRADAS PARA HACERLO ESCUCHAR
        }
        else if(!ordenfiltradas.length){
            dispatch(ordered(toBeOrdered))//DESPACHAMOS SOLO SI NO ESTÁ LLENO, EN ESTE CASO NO LUCHAMOS CONTRA LA PRIORIDAD SETEADA DE FILTRORDERED O COMO SEA
        }
        // dispatch(ordered(recetaslocal))
        // dispatch(binaria(false))
        // setLocal({
        //     ...local,
        //     objetos: [...recetaslocal]
        // })
    }
    function rever(){
        let toBeOrdered
        if(ordenfiltradas.length){
            toBeOrdered= ordenfiltradas
        }
        else if(ordenfiltradas.length=== 0){
            toBeOrdered= recetaslocal
        }
        Reversiva(toBeOrdered)
        if(ordenfiltradas.length){
            dispatch(filtrordenadas(toBeOrdered))//DESPACHAMOS UN ORDEN A FILTRADAS PARA HACERLO ESCUCHAR
        }
        else if(!ordenfiltradas.length){
            dispatch(ordered(toBeOrdered))//DESPACHAMOS SOLO SI NO ESTÁ LLENO, EN ESTE CASO NO LUCHAMOS CONTRA LA PRIORIDAD SETEADA DE FILTRORDERED O COMO SEA
        }
    }

    const [mostrarmaximo, setMostrarmaximo] = useState(false)

    let maximo= Reversiva(recetaslocal, true)
    let found= [maximo]
    function maxs(){
        console.log(maximo)
        setMostrarmaximo("mostrar")
    }

    function typing(e){
        if(e.target.value===""){
            if(recetasordenadas.length){
                dispatch(filtrordenadas(recetasordenadas))
                dispatch(tipear(e.target.value))
            }
            else {
                dispatch(filtrordenadas(recetaslocal))
                dispatch(tipear(e.target.value))
            }
        }
        if(e.target.value!=""){
            if(recetasordenadas.length){//de Redux, asignacion nuestra
                let filtro= recetasordenadas.filter((r)=> r.Nombre.includes(e.target.value))
                dispatch(filtrordenadas(filtro))//action de redux //array de filter vacio!
                dispatch(tipear(e.target.value))
            }
            else if(recetasordenadas.length=== 0){
                let filtro= recetaslocal.filter((r)=>r.Nombre.includes(e.target.value))
                dispatch(filtrordenadas(filtro))//puede quedar vacio //si pasa render siguiente
                dispatch(tipear(e.target.value))
            }
        }
    }

    let selected= []
    function selectClick(e){
        selected.push(e.target.value)
        console.log(selected)
        setSelec([...selec, e.target.value])
    }
    let filtroRenderizar= []

    function filtrar(){
        let arrayToFilter
        if (ordenfiltradas.length) arrayToFilter= ordenfiltradas
        else if (recetasordenadas.length) arrayToFilter= recetasordenadas
        else arrayToFilter= recetaslocal
        filtroRenderizar= Filter(selec, arrayToFilter)

        if(ordenfiltradas.length){
            dispatch(filtrordenadas(filtroRenderizar))//DESPACHAMOS UN ORDEN A FILTRADAS PARA HACERLO ESCUCHAR
        }
        else if(!ordenfiltradas.length){
            dispatch(ordered(filtroRenderizar))
        }
        setSelec([])
    }

    function disyuntiva2(){
        if (filtroRenderizar.length) return filtroRenderizar
        if (ordenfiltradas.length) return ordenfiltradas
        else if (recetasordenadas.length) return recetasordenadas
        else return recetaslocal
    }

    function disyuntiva4(){
        if (filtroRenderizar.length) return filtroRenderizar
        if (ordenfiltradas.length) return ordenfiltradas
        else if (recetasordenadas.length) return recetasordenadas
    }

    let [selec, setSelec] =useState([])
console.log(selec)
    return (
        <div className="searchbar">
            <div className="filtro">
                <button onClick={filtrar}>
                    Filter by these diets
                </button>
                <select onChange={(e)=>selectClick(e)}>
                    {
                    dietas.length && dietas.map((d, i)=><option key={i}>{d} </option>) 
                    }    
                </select>
                
            </div>
            <div className="filtro">
                { selec.length=== 0 && ""}
                { selec.length> 0 && selec.map((s, i)=><span key={i}> {s}; </span>)}

            </div>
            <div className="orden">
                <button onClick={maxs}>
                    Max score
                </button>
                <button onClick={asc}>
                    By name ascendently
                </button>
                <button onClick={desc}>
                    By name descendently
                </button>
                <button onClick={numer}>
                    By health ascendently
                </button>
                <button onClick={rever}>
                    By health descendently 
                </button>
                <input onChange={(e)=>typing(e)} type="text" defaultValue={reduxinput}/>
            </div>
            <div>
                <Area renderizarEncontrado={disyuntiva4()} long={long}/>
                {!mostrarmaximo && <Paginador recetasFiltradasSinModular={disyuntiva2()}/>}
                {mostrarmaximo && <Paginador recetasFiltradasSinModular={found}/>}
            </div>
        </div>
    )
}