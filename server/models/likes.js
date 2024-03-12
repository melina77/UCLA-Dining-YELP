//makes a database table for likes, without any columns defined in this file
//but columns are defined through associations with other database tables
module.exports = (sequelize, DataTypes) =>{
    const likes = sequelize.define("likes");
    return likes;
}