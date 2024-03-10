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
        food.hasMany(models.students)
        food.hasMany(models.comments)
        food.hasMany(models.likes)
    }

    return food;
}