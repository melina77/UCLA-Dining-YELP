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
            validate: {
                len: [8, Infinity],
            },
        },
    });
    dining.associate = (models) =>{
        dining.hasMany(models.food, {
            onDelete: "cascade",
        })
    }
    return dining;
}