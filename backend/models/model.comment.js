const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true,
    },
    UserId:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    CommentId:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    content:{
      type:DataTypes.STRING(500),
      allowNull:false,
    },
    like:{
      type:DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  return Comment;
};
