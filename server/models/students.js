//makes a database table for student users with columns corresponding to username, email, and password
//each student user is associated with comments, a calorie counter, and likes
module.exports = (sequelize, DataTypes) =>{
    const students = sequelize.define("students", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
    students.associate = (models) =>{
        students.hasMany(models.comments, {
            onDelete: "cascade",
        })
        students.hasMany(models.calcounter, {
            onDelete: "cascade",
        })
        students.hasMany(models.likes, {
            onDelete: "cascade",
        })
    }
    return students;
}