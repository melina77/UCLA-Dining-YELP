module.exports = (sequelize, DataTypes) =>{
    const comments = sequelize.define("comments", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.BLOB('long'),
        },
    });
    comments.associate = (models) =>{
        comments.hasMany(models.likes, {
            onDelete: "cascade",
        })
    }
    return comments;
}