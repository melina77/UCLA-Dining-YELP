//create database table for dining hall users with columns corresponding to the dining hall name, email, and password
//each dining hall is associated with food posts and comments
module.exports = (sequelize, DataTypes) =>{
    const dining = sequelize.define("dining", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
           type: DataTypes.STRING,
           allowNull: false,
           unique: true,
           validate: {
            isEmail: true,
           }, 
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
        },
    });
    dining.associate = (models) =>{
        dining.hasMany(models.food, {
            onDelete: "cascade",
        })
        dining.hasMany(models.comments, {
            onDelete: "cascade",
        })
    }
    return dining;
}