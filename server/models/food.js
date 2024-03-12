//creates database table for food items, with columns corresponding to the poster, name of food, description, calories, and an image
//each food item is associated with comments, likes, and a calorie counter
module.exports = (sequelize, DataTypes) =>{
    const food = sequelize.define("food", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        poster: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
           type: DataTypes.STRING,
           allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
    });
    food.associate = (models) =>{
        food.hasMany(models.comments, {
            onDelete: "cascade",
        })
        food.hasMany(models.likes, {
            onDelete: "cascade",
        })
        food.hasMany(models.calcounter, {
            onDelete: "cascade",
        })
    }

    return food;
}