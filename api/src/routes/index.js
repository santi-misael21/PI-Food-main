const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipe = require ("./recipes.js")
const Diet =require ("./diet.js")


const router = Router();

router.use("/recipes", Recipe)
router.use("/diets", Diet)

module.exports = router;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



