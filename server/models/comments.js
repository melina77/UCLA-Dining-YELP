//create comments database table with columns corresponding to the poster, body, and image of the comment
module.exports = (sequelize, DataTypes) =>{
    const comments = sequelize.define("comments", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        poster: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
    });
    return comments;
}