import { Link } from "react-router-dom";
import '../App.css';
import '../estilos/0-Area/area.css';
import React from 'react';

export default function Area({renderizarEncontrado, long}){

    return (
        <div className="area">
            {renderizarEncontrado&& renderizarEncontrado.length< long && 
            renderizarEncontrado.map((elem, i)=>
            <div className="botonesArea" key={i}>
            <Link to={`/recipes/${elem.id}`}>
                <button className='buttonRecipe' >
                    {elem.Nombre}
                </button>
            </Link>
            </div>
            )}
        </div>
    )
}