module.exports = (sequelize, DataTypes) =>{
    const food = sequelize.define("food", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
            type: DataTypes.BLOB('long'),
        },
    });
    food.associate = (models) =>{
        food.hasMany(models.comments, {
            onDelete: "cascade",
        })
        food.hasMany(models.likes, {
            onDelete: "cascade",
        })
        food.hasMany(models.calories, {
            onDelete: "cascade",
        })
    }

    return food;
}