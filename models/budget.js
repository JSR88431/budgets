module.exports = function(sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
      money: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 50]
        },
      }, 
      source: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    Budget.associate = function(models){
        Budget.belongsTo(models.User, {
            foreignKey: {
              //allowNull: false
            }
        })
    }
    return Budget;
  };