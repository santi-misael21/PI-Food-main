import '../App.css'
import '../estilos/2-Recetas/recetas.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Diet from './6-Diet';
// import RecipeDetail from './4-RecipeDetail';

export default function Recipe ({Nombre, Health, Image, id, Dietas}){
    //Nombre: "string",
    //Image: "link",
    //Diets: [],
    //id: integer
    
    let varStyle=""
    if(Health>= 75){
        varStyle= "verde"
    }
    else if(Health>= 50){
        varStyle= "amarillo"
    }
    else if(Health>= 25){
        varStyle= "naranja"
    }
    else if(Health>= 0){
        varStyle= "rojo"
    }



    return(
        <div className='eachrecipe'>
            <Link to={`/recipes/${id}`}>
                <button className='buttonRecipe' >
                    <h3 className="recipe_title">{Nombre}</h3>
                </button>
            </Link>
            
            <p className='fuente' id={varStyle}><b>Nivel de saludable: {Health}</b></p>
            {/* <h3><p className={varStyle}>Nivel de saludable: <b>{Health}</b></p></h3> */}
            <img className='plato' src={Image} alt=''/>
            <h3 style={{"color":"black"}}>Diets of this recipe: {Dietas.length && Dietas.length}</h3>
            
            {Dietas && Dietas.length>0 && Dietas.map((d, i)=> <Diet key={i} name={d} />)}
            <br/>
        </div>
    )
}