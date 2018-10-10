
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
 }, {
        hooks: {
          beforeCreate: async function(user) {
            var salt = await bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password,salt);
          }
        },
        instanceMethods: {
          validPassword: function(password) {
            console.log(this)
            return bcrypt.compareSync(password,this.password)
          }
        }
      });
      User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Expenses, {
          //foreignKey: 'fk_userid',
          //sourceKey: 'uuid'
        });
      };
      User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    }
    return User;
}