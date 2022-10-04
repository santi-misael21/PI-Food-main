require('dotenv').config();
const express = require("express");
const router = express.Router();
const {recipe, step,  Op, dieta} = require("../db");
const ApiDiets = require('../models/ApiDiets');
const Recipe = require('../models/Recipe');
const Dieta = require('../models/Diet1-n.js');
// import {OrderIds} from "./modulados/0-OrdenarIds.js";
const {OrderIds} = require ("./modulados/0-OrdenarIds.js");
// const Diet = require('../models/DietType.js')

const axios = require('axios').default;

const {API_KEY,
    // DB_USER, DB_PASSWORD, DB_HOST, 
  } = process.env;

let link99recipes= `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`

// https://api.spoonacular.com/recipes/complexSearch?apiKey=5f1cbaefd57a4df38b80c941c0a5e4f6&number=2&addRecipeInformation=true

// GET A /RECIPES/:ID, INFO DE RECETA POR ID, INCLUIR DIETA, "SOLO DATOS PEDIDOS"

// router.get("/table", async(req,res)=>{
//     let call= await axios.get(
//         "https://surtidores.com.ar/precios/")
//     if(call){
        
//         function firstcut(string= call.data){
//             for(let b= 0; b< string.length; b++){
//                 if(string[b]== "<" && string[b+1]== "t" && string[b+2]== "a"){
//                     let q= string.slice(b)
//                     return q
//                 }
//             }
//         }
//         let cut= firstcut()
//         function totalcut(){
//             for(let z= cut.length; z>= 0; z--){
//                 if(cut[z-5]== "/" && cut[z-4]== "t" && cut[z-3]== "a" && cut[z-2]== "b" && cut[z-1]== "l" && cut[z]=="e"){
//                     let tot= cut.slice(0, z+2)
//                     return tot
//                 }
//             }
//         }
//         let corte= totalcut()
//         console.log(corte)

//         return res.status(200).send(corte)
//     }
//     else if(!call){
//         return res.status(404).json("No hay call -> !call")
//     }
// })

// router.post("/table", async(req, res)=>{
//     let {tabla} = req.body
//     console.log(tabla)
//     res.send("ok")
// })

router.get("/:id", async (req, res)=>{

    // console.log("get a .../:id: ", req.params)
    let {id} = req.params

    try {
        let detalle= await axios.get(`https://santiagoalamos-foodpi.herokuapp.com/recipes`)
        let answer= detalle.data[id -1]
    
        return res.status(200).json(answer)
    } 
    catch (error) {
        console.log("Error en get a '3001/recipes/:id'.", error)
    }

})
let numerusID

// GET A /RECIPES/?NAME=..., RECETAS QUE INCLUYAN NOMBRE, SI NO MOSTRAR MENSAJE


router.get("/", async (req, res)=>{

    // const {name} = req.query
    // if(name){

    // }

    // let {name} = req.query

    //I WAS WRONG, WE ALWAYS GET TO MAKE A CALL TO API
    //NOT ALWAYS, BUT YES FIRST TIME WE INVOQUE THIS PATH ("/RECIPES"),
    //AND EACH TIME THAT WE MAKE A REQUEST TO THIS, THE ROUTER 
    //MUST RETURN THE TABLE IN SQL
    //SO LET'S CALL THE API INCONDITIONALY
    
    let análisis= await recipe.findAll()
    let pasosTable= await step.findAll()
    let recetaDieta= await dieta.findAll()
    let análisisOrderID= []//arreglo de lo obtenido en BD (nuestras creadas), que se va a sumar a la respuesta de la api, todo al front

    let go= true
    if(go && análisis.length> 0){
        numerusID= análisis.length
        console.log("numerus seteado desde análisis, Base de Datos: ", numerusID)

        console.log("Desde la base de datos.")
        // //CONCATENAR LOS STEPS DE STEP, CON LAS PROPS DE CADA ANÁLISIS
        let bucle= true
        // for(let p= 0; p< análisis.length; p++){
        //     if(typeof análisis[p].dataValues.Dietas== "object"){
        //         bucle= false
        //     }
        // }
        if(bucle){
            for (let i= 0; i< análisis.length; i++){ //ANÁLISIS

                análisis[i].dataValues.Pasos= []
                análisis[i].dataValues.Dietas= []

                for (let j= 0; j< pasosTable.length; j++){ //PASOSTABLE
                    if (análisis[i].id === pasosTable[j].recipeId){
                        análisis[i].dataValues.Pasos.push(pasosTable[j].Nombre)
                    }
                }//ADHERIMOS LOS DATOS AL ARRAY ANÁLISIS, AL QUE SE LLAMA DESDE EL FRONTEND

                for (let k= 0; k< recetaDieta.length; k++){ //DIETASFRONTEND
                    if (análisis[i].id === recetaDieta[k].recipeId){
                        análisis[i].dataValues.Dietas.push(recetaDieta[k].Nombre)
                    }
                }//ADHERIMOS LOS DATOS AL ARRAY ANÁLISIS, AL QUE SE LLAMA DESDE EL FRONTEND
            }
        }
        //DEVOLVER ANÁLISIS, AL CUAL YA SE LE INCLUYERON LOS STEPS 
        análisisOrderID= OrderIds(análisis)
        return res.status(201).json(análisisOrderID)//CANCELAR ESTA LINEA 24/6/22 y usar el proceso de arriba revisando tema ids
    }
    //NUESTRA BENDITA INFO PARA EL FRONT, DE AHORA EN MÁS SOLO CARGAMOS LA DATA A LA BD
    let callRecetas= await axios.get(link99recipes)
    let frontdata= []
    console.log("numerus seteado desde callRecetas, API:", numerusID)


    //ITERAMOS EN LA RESPUESTA DE LA API PARA GUARDAR LO NECESARIO Y MANDARLO AL FRONT
    callRecetas.data.results.filter((r,i)=>frontdata.push({
        id: i+1,
        Nombre: r.title,
        Resumen: r.summary,
        HealthScore: r.healthScore,
        Imagen: r.image,
        Pasos: [],
        Dietas: r.diets,
    })) //TODO LO QUE SE VA A MANDAR AL FRONT SETEADO, ¡EXCEPTO LOS PASOS! LO HACEMOS A CONTINUACIÓN --->
    if(false){
    for(let e= 0; e< callRecetas.data.results.length; e++)  {
        if(callRecetas.data.results[e].analyzedInstructions.length> 0){
            for(let f= 0; f< callRecetas.data.results[e].analyzedInstructions[0].steps.length; f++){

                frontdata[e].Pasos.push(callRecetas.data.results[e].analyzedInstructions[0].steps[f].step)
            }
        }   //PASOS SETEADOS PARA MANDARSE AL FRONT ---> ARREGLO FRONTDATA LISTO
    }
    }
    //_______________________________________________________________________________________________________
    //_______________________________________________________________________________________________________

    //24/5 proceso de guardado de datos de API en BD suspendido mediante una variable booleana condicional saveInDB= false

    // AÑADIMOS TODAS (NOMBRE, RESUMEN, HEALTHSCORE e IMAGEN),
    // EXCEPTO LAS PROPS QUE SON UN ARRAY (STEPS y DIETS)
    
    if (true){
        for(let e= 0; e< callRecetas.data.results.length; e++){
            let filaReceta= await recipe.create({
                Nombre: callRecetas.data.results[e].title,
                Resumen: callRecetas.data.results[e].summary,
                HealthScore: callRecetas.data.results[e].healthScore,
                Imagen: callRecetas.data.results[e].image
            })
            //STEPS NOS VALEMOS DE LA TABLA STEP:
            //ESTE ES EL FILTRO DE PASOS
            //SI HAY UN ARRAY MAYOR A 0, HAY PASOS
            //ENTONCES SE ITERA SOBRE LA PROPIEDAD STEPS DE ESE ARRAY 
            if(callRecetas.data.results[e].analyzedInstructions.length> 0){
                for(let f= 0; f< callRecetas.data.results[e].analyzedInstructions[0].steps.length; f++){
                    let filaStep= await step.create({
                        Nombre: callRecetas.data.results[e].analyzedInstructions[0].steps[f].step
                    })
                    frontdata[e].Pasos.push(callRecetas.data.results[e].analyzedInstructions[0].steps[f].step)
                    let result= await filaStep.setRecipe(e +1)
                // CADA STEP SE GUARDA EN UN OBJETO, JUNTO CON UN ID, QUE LO ASOCIA A SU RECETA
                //COMENTADA RECIÉN, 16/6 11:36
                // steps.push({id: e +1, paso: callRecetas.data.results[e].analyzedInstructions[0].steps[f].step})
                }
                // análisis[e].Dietas= callRecetas.data.results[e].analyzedInstructions[0].steps
            }
            // let dietsOfRecipe= await callRecetas.data.results[e].diets z
            //DIETS NOS VALEMOS DE LA TABLA DIET
            //MISMO QUE EN STEP
            if(callRecetas.data.results[e].diets.length> 0){
                for (let g= 0; g< callRecetas.data.results[e].diets.length; g++){
                    let filaDieta= await dieta.create({
                        Nombre: callRecetas.data.results[e].diets[g]
                    })
                    await filaDieta.setRecipe(e +1)
                }
                
            }
            // for (let g= 0; g<  callRecetas.data.results[e].diets.length; g++){
            //     await filaReceta.createDiet({
            //         Nombre: callRecetas.data.results[e].diets[g]
            //     })
            // }
        }
    }
    // let recs= await recipe.findAll()
    console.log("Desde la API.")
    let frontdataOrderID= OrderIds(frontdata)

    if(análisis.length){
        numerusID= frontdataOrderID.length +análisisOrderID.length
        return res.status(200).json([...frontdataOrderID, ...análisisOrderID])
    }
    numerusID= frontdataOrderID.length
    return res.status(200).json(frontdataOrderID)
        // .then(r=>res.status(201).json(r)).catch(e=>res.json(e))
    // }
    

    //POR EL MOMENTO, SI NO HAY NAME, HACEMOS UN LLAMADO A LA API PARA CARGAR 100 RECETAS
    // if (!name){
    //     if(!recetas){
    //         for(let e= 0; e< 99; e++){
    //             recetas.push()
    //         }
    //     }
    // return res.status(201).json(recetas) 
    // }


    // let recetasByName = await recipe.findAndCountAll({ 
    //     where: {
    //         [Op.or]: [
    //             {
    //                 Nombre: {//ESTO FUNCIONA
    //                     [Op.like]: name,
    //                     [Op.like]: name+"%",
    //                     [Op.like]: "%"+name,
    //                     [Op.like]: "%"+name+"%"
    //                 }
    //             }
    //         ]
    //     }
    // })

    // let matches =recetasByName.rows
    // if(matches.length> 0){
    //     return res.status(201).json(matches)
    // }
    // return res.status(404).send("No hayamos coincidencias con ese nombre.")

})


// POST A /RECIPES/, CREA RECETA NUEVA POR BODY DEL FORMULARIO, INCLUYE TIPO DE DIETA, VA A LA BD
// Me hizo clic la cabeza, por eso recipes no tiene una columna de dieta de esa receta, porque
// puede tener 3 dietas, y no se ponen todas juntas, qué mogólico jsjsjaskjasjs

router.post("/", async (req, res)=>{

    console.log(req.body)
    let  { Nombre, Resumen, HealthScore, Pasos, Imagen, Dietas } = req.body

    console.log(req.body)

    console.log(Dietas.length)
    if( Dietas.length== 0 || !Nombre || !Resumen|| !HealthScore){
        return res.send("Faltan datos obligatorios.")// Muy esqueleto todavía
    }//En realidad si faltan datos, se checkea en el frontend 

    // //DESCOMENTAR DESDE ACÁ
    let filaReceta= await recipe.create({
        Nombre: Nombre,
        Resumen: Resumen,
        HealthScore: HealthScore,
        Imagen: Imagen,
        id: numerusID +1
    }) //DESCOMENTAR HASTA ACÁ


    if(Pasos.length> 0){
        for(let z= 0; z< Pasos.length; z++){
            let filaStep= await step.create({
                Nombre: Pasos[z]
            })  
            await filaStep.setRecipe(numerusID +1)
            console.log("filaStep, su numerusID", numerusID )
        }
        
    }

    if(Dietas.length> 0){ 
        for (let y= 0; y< Dietas.length; y++){
            let filaDieta= await dieta.create({
                Nombre: Dietas[y]
            })
            await filaDieta.setRecipe(numerusID +1)
            console.log("filaDieta, su numerusID", numerusID)
            // dietasFrontend.push({e: e +1, g: g +1, dieta: callRecetas.data.results[e].diets[g]})
        }
    }
    numerusID++
    return res.status(201).send("Bien hecho tío")
    
})

module.exports = router;