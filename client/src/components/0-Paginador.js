import React from "react";
import AllRecipes from "./2-Recipes.jsx";

export default function Paginador({recetasFiltradasSinModular}){
  
    var paginado
    if(recetasFiltradasSinModular.length> 0){
      let rl= recetasFiltradasSinModular.length
      let pages= Math.ceil(rl/ 9)
      let modulo= rl% 9
      let final= 9
      paginado= new Array(pages)
      let y= 0
      for(let e= 0; e< pages; e++){
        if(e=== pages -1 && modulo!= 0) final= modulo
        paginado[e]= []
        for(let f= 0; f< final; f++){
  
          paginado[e].push(recetasFiltradasSinModular[y])
          y++
        }
      }
    }
    else{
        console.log("Else Paginado: No hay recetas")
        // alert("Alert Paginado: No hay recetas")
    }


    return(
      <div>
        {!recetasFiltradasSinModular.length && <div className="loadingrecipes"> <h1>...Loading recipes...</h1> <img alt="" src="https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif" /> </div>}
        {paginado && <AllRecipes recipes={paginado} />}
        
      </div>
    )

}
