const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const voter = sequelize.define('Voter', {
 
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
    PostId:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    CommentId:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  });

  return voter;


};
