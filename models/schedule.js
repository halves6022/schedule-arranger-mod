'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Schedule = loader.database.define('schedules', {
  scheduleId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  scheduleName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  memo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdBy: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  openFlag:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ['createdBy']
      }
    ]
  });

module.exports = Schedule;