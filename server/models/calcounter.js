//create calorie counter database with one column corresponding to the number of calories
module.exports = (sequelize, DataTypes) =>{
    const calcounter = sequelize.define("calcounter", {
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return calcounter;
}