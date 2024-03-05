module.exports = (sequelize, DataTypes) =>{
    const calcounter = sequelize.define("calcounter", {
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return calcounter;
}