'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category}) {
      this.belongsTo(Category, {foreignKey: "categoryID", as:'category'});
    }
  }
  Task.init({
    naziv: DataTypes.STRING,
    datum: DataTypes.DATE,
    opis: DataTypes.STRING,
    zavrseno: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};