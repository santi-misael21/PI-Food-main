// require('dotenv').config();
const express = require("express")
const router = express.Router()
const {dieta, apidiets} = require("../db");
// const compact001 = require("./auxiliar_functions/for_diet");
const axios = require('axios').default;

const {API_KEY} = process.env;

// let dietsNoDuplicated =[]

router.get("/", async (req, res)=>{

    // let hardcode=["vegan", "ovo lacto vegetarian", "primal", "whole 30", "pescatarian", "dairy free", "gluten free", "paleotithic"]
    // return res.status(201).json(hardcode)

    let ourDiets= await dieta.findAll() //dietas nuestras, al cargarse datos en db, al crear recetas nuevas
    let themDiets= await apidiets.findAll() //dietas suyas, sin recetas nuevas, desde API

    let onlyNames= [] 
    if(ourDiets.length > 0){
        console.log("nuestras dietas desde tabla dieta")
        for(let j= 0; j< ourDiets.length; j++){
            onlyNames.push(ourDiets[j].Nombre)
        }
        const noReps = new Set(onlyNames);
        noDups = [...noReps];
        return res.status(201).json(noDups)
    }

    if(themDiets.length > 0){
        console.log("Estoy acá, tabla apidiets") //PRUEBA DE QUE NO LLAMA A LA API MÁS DE UNA VEZ, COMENTAR LUEGO
        let finalThemDiets= []
        for (let q= 0; q< themDiets.length; q++){
            finalThemDiets.push(themDiets[q].Nombre)
        }
        return res.status(201).json(finalThemDiets)
    }
    
    try {

        let endpointForIds = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1`
        let recetasMuestra= await axios.get(endpointForIds)
        let simpleRecipes= recetasMuestra.data.results
        let ids= []


        for (let a= 0; a< simpleRecipes.length; a++){
            ids.push(simpleRecipes[a].id)
        }
        // LA SIGUIENTE LÍNEA FUE COMENTADA PARA SEGUIR CON LA LÓGICA
        // return res.status(200).json(ids)
    
        // LAS SIGUIENTES DOS LÍNEAS FUERON USADAS PARA DESCUBRIR INFO.DATA.DIETS
        // let info= await axios.get(`https://api.spoonacular.com/recipes/715594/information?apiKey=${API_KEY}`)
        // return res.json(info.data.diets)
    
        // LA SIGUIENTE LÍNEA SE COMENTÓ POR ENTENDERSE COMO MOMENTÁNEAMENTE INNECESARIA
        // let endpointForDiets = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        let dietsGrosoModo= []
    
        for(let b= 0; b< ids.length; b++){ //LO MÁS ÓPTIMO PARA LOS CALLS A LA API FUE HACER 1, 2, Y 3
            let info= await axios.get(`https://api.spoonacular.com/recipes/${ids[b]}/information?apiKey=${API_KEY}`)
            console.log("Llamado")
            for (let c= 0; c< info.data.diets.length; c++){
                dietsGrosoModo.push(info.data.diets[c])
            }
        }
        const dataArr = new Set(dietsGrosoModo);
        dietsNoDuplicated = [...dataArr];
        // AHORA BIEN ESTOY SOLAMENTE DEVOLVIENDO DATOS TRAIDOS
        // GUARDALOS EN LA TABLA Y DESPUÉS RESPONDE CON UNA LECTURA DE LA MISMA
        for(let d= 0; d< dietsNoDuplicated.length; d++){
            apidiets.create({Nombre: dietsNoDuplicated[d]})
        }

        return res.status(201).json(dietsNoDuplicated)

    } catch (error) {
        res.status(404).json(error.message)
    }

    // LA SIGUIENTE LÍNEA FUE CLAVE PARA ENTENDER EL ACCESO A LOS RESULTADOS EN SÍ
    //.then(ans=> res.json(ans.data.results)).catch((e)=>{res.send(e)})
    

    // FETCH NO TUVO ÉXITO
    // fetch(endpoint).then(r=>r.json()).then(json=> console.log(json)).catch((e)=>{console.log(e)})

    // LO PRIMERO QUE FUE REALIZADO
    // .then((d)=>{//sacale el result a probar
    //     res.status(201).json(d)
    // }).catch((e)=>{
    //     res.send(404).json(e)
    // })
})

module.exports= router