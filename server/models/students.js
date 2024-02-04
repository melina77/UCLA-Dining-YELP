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
            validate: {
                len: [8, Infinity],
            },
        },
    });
    students.associate = (models) =>{
        students.hasMany(models.comments, {
            onDelete: "cascade",
        })
    }
    return students;
}