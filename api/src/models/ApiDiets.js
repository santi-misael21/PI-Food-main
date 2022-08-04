const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('apidiets', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            get(){
                let v= this.getDataValue('Id')
                return v +" foods"
            }
        },
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