const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // console.log(sequelize);
    sequelize.define('diet', {
        Nombre: {
            type: DataTypes.STRING,
        }
    },
    {
        timeStamps: false,
        createdAt: false, // don't add createdAt attribute
        updatedAt: false
    })
}