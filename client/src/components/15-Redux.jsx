import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Recipe from "./3-Recipe";

export default function Creado(){

    let inventadas= useSelector(state=> state.creadas) // [{...reciencreada}]
    console.log(inventadas)

    // function a(){

    // }

    // useEffect(()=> a())

    return (
        <div>
            <p>Memoria de Redux</p>
            <p>Acá se renderizan los objetos creados desde la última recarga de la App</p>
            {inventadas && inventadas.length> 0 && inventadas.map((r, i)=><Recipe
                Health= {r.HealthScore}
                Nombre= {r.Nombre}
                Dietas= {r.Dietas}
                Image= {r.Imagen}
                id= {r.id}
                key= {i}
    
            />)}
        </div>
    )
}