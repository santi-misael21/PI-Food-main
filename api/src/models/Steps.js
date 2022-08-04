const { DataTypes } = require("sequelize");

module.exports= (sequelize)=>{

    sequelize.define("step", {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            // allowNull: false,
            get(){
              let v= this.getDataValue('Id')
              return "Step " +v +"."
            }
        },
        Nombre: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    },{
    timeStamps: false,
    createdAt: false, // don't add createdAt attribute
    updatedAt: false
  })
}