// const axios = require('axios').default;
// const {diet} = require("../../db");
// const {API_KEY} = process.env;
// const express = require("express")
// const router = express.Router()

//  INTENTO DE MODULARIZAR, CONTINUARÁ
module.exports= {
    // compact001: async function (){

    //     let endpointForIds = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=4`
    //     let recetasMuestra= await axios.get(endpointForIds)
    //     let simpleRecipes= recetasMuestra.data.results
    //     let ids= []

    //     for (let a= 0; a< simpleRecipes.length; a++){
    //         ids.push(simpleRecipes[a].id)
    //     }
    //     // LA SIGUIENTE LÍNEA FUE COMENTADA PARA SEGUIR CON LA LÓGICA
    //     // return res.status(200).json(ids)
    
    //     // LAS SIGUIENTES DOS LÍNEAS FUERON USADAS PARA DESCUBRIR INFO.DATA.DIETS
    //     // let info= await axios.get(`https://api.spoonacular.com/recipes/715594/information?apiKey=${API_KEY}`)
    //     // return res.json(info.data.diets)
    
    //     // LA SIGUIENTE LÍNEA SE COMENTÓ POR ENTENDERSE COMO MOMENTÁNEAMENTE INNECESARIA
    //     // let endpointForDiets = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    //     let dietsGrosoModo= []
    
    //     for(let b= 1; b< ids.length; b++){ //LO MÁS ÓPTIMO PARA LOS CALLS A LA API FUE HACER 1, 2, Y 3
    //         let info= await axios.get(`https://api.spoonacular.com/recipes/${ids[b]}/information?apiKey=${API_KEY}`)
    //         for (let c= 0; c< info.data.diets.length; c++){
    //             dietsGrosoModo.push(info.data.diets[c])
    //         }
    //     }
    //     const dataArr = new Set(dietsGrosoModo);
    //     let dietsNoDuplicated = [...dataArr];
    //     return res.status(201).json(dietsNoDuplicated)

    // }
}