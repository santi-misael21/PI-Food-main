//FUNCS PARA FILTRAR EL ARREGLO QUE LLEGA DESDE EL BACK
//YA SEA DESDE DATABASE O DESDE LA API
//NOTA: EL ORDEN DE LA BASE DE DATOS ES INMUTABLE
//LO MÁS PERMANENTE QUE HAY ES EL ESTADO DE REDUX A ESTE RESPECTO

export function Ascensora(recetaslocal) {//ASCENSORA POR NOMBRE
    for(let i= 1; i< recetaslocal.length; i++){
        for (let o= i; o>= 1; o--){
            if (recetaslocal[o].Nombre< recetaslocal[o -1].Nombre){
                var box= recetaslocal[o]
                recetaslocal[o]=  recetaslocal[o -1]
                recetaslocal[o -1]= box
            }
        }
    }
}

export function Descensora(RL){//DESCENSORA POR NOMBRE
    Ascensora(RL)
    RL.reverse()
}

export function Numérica(recetaslocal){//NUMERICA ASCENSORA
    for(let i= 1; i< recetaslocal.length; i++){
        for (let o= i; o>= 1; o--){
            if (recetaslocal[o].HealthScore< recetaslocal[o -1].HealthScore){
                var box= recetaslocal[o]
                recetaslocal[o]=  recetaslocal[o -1]
                recetaslocal[o -1]= box
            }
        }
    }
}

export function Reversiva(rl, primero){//NUMERICA REVERSIVA
    Numérica(rl)
    let val=rl.reverse()
    if(primero){
        console.log(val[0])
        return val[0]
    }
}

//FUNC PARA FILTRAR POR DIETA
export function Filter(dietas, array){
    let recetasCoinciden= []
    for(let j= 0; j< array.length; j++){
        for (let d= 0; d< array[j].Dietas.length; d++){
            for (let t= 0; t< dietas.length; t++){
                if(array[j].Dietas[d] === dietas[t]){
                    recetasCoinciden.push(array[j])
                }

            }
        }
    }

    const noReps = new Set(recetasCoinciden);
    let noDups = [...noReps];
    
    return noDups
} 

// export function OrderIds(original){//NUMERICA ASCENSORA
//     for(let i= 1; i< original.length; i++){
//         for (let o= i; o>= 1; o--){
//             if (original[o]< original[o -1]){
//                 var box= original[o]
//                 original[o]=  original[o -1]
//                 original[o -1]= box
//             }
//         }
//     }
//     return original
// }

// export function Maxs(recetas){
//     return Reversiva(recetas)
// }