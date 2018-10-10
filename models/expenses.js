
module.exports = function(sequelize, DataTypes) {
    var Expenses = sequelize.define("Expenses", {
      amount: {
        type: DataTypes.INTEGER,
        validate: {
          len: [1, 50]
        },
      }, 
      description: {
        type: DataTypes.STRING,
      },
      // income: {
      //   type: DataTypes.INTEGER,
      //   validate: {
      //     len: [1, 50]
      //   },
      // }, 
      // source: {
      //   type: DataTypes.STRING,
      // }
    });
    Expenses.associate = function(models){
        Expenses.belongsTo(models.User, {
            foreignKey: {
              //allowNull: false
            }
        })
    }
    return Expenses;
  };
  