const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // console.log(sequelize);
  sequelize.define('recipe', {
    // nuestroID: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   // primaryKey: true,
    //   allowNull: false,
    //   // get(){
    //   //   let v= this.getDataValue('Id')
    //   //   return v +" foods"
    //   // }
    // },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Resumen: {
      type: DataTypes.TEXT,
      // allowNull: false,

    },
    HealthScore: {
      type: DataTypes.INTEGER,
      validate:{ //estoy especulando no sé si es así
        max: 100,
        min: 1
      }
    },
    Imagen: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    // id: {
    //   type:DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true
    // }
    // Pasos: {
    //   type: DataTypes.STRING,
    //   //validate: {maximo de caracteres}
    // },
    // Dietas: {

    // }

  },{
    timeStamps: false,
    createdAt: false, // don't add createdAt attribute
    updatedAt: false
  }
  );
};
