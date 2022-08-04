import '../App.css'
import '../estilos/2-Recetas/recetas.css';
import React from "react";
import Diet from './6-Diet.jsx';

import { detail } from '../redux/actions/index.js';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react'; 
import { Paso } from './9-Paso';
import { Back } from './--1-BajoSubsuelo';

export default function RecipeDetail({match}){

    let data = useSelector(state=> state.recipeDetail)
    const dispatch = useDispatch()
    // if(!data) console.log("no but", match.params.id)


    function a(){
        // if(data)console.log(data)
        if(Object.keys(data).length=== 0 || data.id!= match.params.id){
            dispatch(detail(match.params.id))
        }
    }
    
    useEffect(
        () => {
            a()
        }
    )

    // console.log("recipe desde Detail", recipe)

    //VENÍA DE DATA PERO VAMOS A TRAERLO DE REDUX:

    let {Nombre, Imagen, HealthScore, Resumen, Dietas, Pasos} = data


    let resumen
    let introDietas= ""
    if (Resumen!= undefined){
        resumen= Resumen.replaceAll(/<(“[^”]*”|'[^’]*’|[^'”>])*>/g, '')
    }
    // if(Dietas.length== 0){
    //     introDietas
    // }
    
    if(typeof Dietas== "object"){
    
        if(Dietas.length=== 1){
            introDietas= "Esta receta se engloba en una dieta: "
        }
        else if(Dietas.length> 1){
            introDietas= "Esta receta se engloba en " +Dietas.length +" dietas: "
        }

    }
    // console.log(Object.keys(data).length==0)
    let loading=""
    if(Object.keys(data).length===0) loading="yes"

    let varStyle=""
    if(HealthScore!= undefined){
        if(HealthScore>= 75){
            varStyle= "verde"
        }
        else if(HealthScore>= 50){
            varStyle= "amarillo"
        }
        else if(HealthScore>= 25){
            varStyle= "naranja"
        }
        else if(HealthScore>= 0){
            varStyle= "rojo"
        }
    }
    
    return(
        <div className={loading && 'loading'} id="id">
            <div className='detalle'>
                <Back/>
                <h2 className='fuente' id='azure'>{Nombre}</h2>
                <img src={Imagen} alt='' className='imagedetail'/>
                
                <p className='fuente' id={varStyle}><b>Nivel de saludable: {HealthScore}</b></p>
                <div className='resumen' id='azure'>
                    <b >Summary / Resumen: </b>
                    <br/>
                    {resumen}
                </div>
                <br/>
                {introDietas}
                {Dietas && Dietas.map((d, i)=><Diet name= {d} key= {i}/>)} 
                {Pasos && Pasos.map((p, i)=> <div className='resumen' id="azure" key={i}> <b>Step {i +1}: </b> <Paso key={i} texto={p}/> </div>)}
            </div>
        </div>

    )
}